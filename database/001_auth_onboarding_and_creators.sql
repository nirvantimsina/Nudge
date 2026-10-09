-- =============================================================================
-- Migration: 001_auth_onboarding_and_creators.sql
-- Description: Adds user onboarding analytics, Zitadel IAM user sync,
--              and creator profile provisioning for Nudge.
-- =============================================================================

-- 1. SCHEMAS
CREATE SCHEMA IF NOT EXISTS "user";
CREATE SCHEMA IF NOT EXISTS creator;
CREATE SCHEMA IF NOT EXISTS permission;
CREATE SCHEMA IF NOT EXISTS analytics;

-- 2. USER TABLE ENHANCEMENTS
-- Ensure tblusers has subjectid (Zitadel external ID) and email columns
ALTER TABLE "user".tblusers ADD COLUMN IF NOT EXISTS subjectid VARCHAR(255);
ALTER TABLE "user".tblusers ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE "user".tblusers ADD COLUMN IF NOT EXISTS updatedat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_tblusers_subjectid ON "user".tblusers(subjectid);
CREATE INDEX IF NOT EXISTS idx_tblusers_email ON "user".tblusers(email);

-- 3. ONBOARDING & ANALYTICS TABLE
CREATE TABLE IF NOT EXISTS analytics.tbluseronboarding (
    onboardingid SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL REFERENCES "user".tblusers(userid) ON DELETE CASCADE,
    referral_source VARCHAR(100) NOT NULL,
    intended_use VARCHAR(100) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_onboarding_userid ON analytics.tbluseronboarding(userid);

-- 4. CREATOR TABLE (ENSURE PRESENT)
CREATE TABLE IF NOT EXISTS creator.tblcreators (
    creatorid SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL REFERENCES "user".tblusers(userid) ON DELETE CASCADE,
    slug VARCHAR(200) UNIQUE,
    categoryid INTEGER,
    name VARCHAR(200),
    description TEXT,
    bio TEXT,
    nudgecount INTEGER DEFAULT 0,
    avatar TEXT,
    tiername VARCHAR(100),
    isverified BOOLEAN DEFAULT FALSE,
    createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    isactive BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_tblcreators_userid ON creator.tblcreators(userid);
CREATE INDEX IF NOT EXISTS idx_tblcreators_slug ON creator.tblcreators(slug);

-- 5. FUNCTION: permission.fn_upsert_user
-- Synchronizes Zitadel IAM authentication claims into local users and creators tables.
CREATE OR REPLACE FUNCTION permission.fn_upsert_user(
    p_subject_id VARCHAR,
    p_email VARCHAR,
    p_username VARCHAR,
    p_role_id INT DEFAULT 2
)
RETURNS TABLE(
    user_id INT,
    creator_id INT,
    role_id INT,
    user_name VARCHAR,
    name VARCHAR,
    email VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_userid INT;
    v_creatorid INT;
    v_name VARCHAR;
BEGIN
    -- 1. Try to find user by subjectid, username, or email
    SELECT u.userid, u.name INTO v_userid, v_name
    FROM "user".tblusers u
    WHERE (p_subject_id IS NOT NULL AND u.subjectid = p_subject_id)
       OR u.username = p_username
       OR (p_email IS NOT NULL AND u.email = p_email)
    LIMIT 1;

    -- 2. If not found, insert new user
    IF v_userid IS NULL THEN
        INSERT INTO "user".tblusers (
            username, roleid, name, email, subjectid, isactive, createdat
        )
        VALUES (
            p_username, p_role_id, p_username, p_email, p_subject_id, TRUE, CURRENT_TIMESTAMP
        )
        RETURNING "user".tblusers.userid, "user".tblusers.name INTO v_userid, v_name;
    ELSE
        -- Update existing user profile with external subject and email
        UPDATE "user".tblusers
        SET subjectid = COALESCE(subjectid, p_subject_id),
            email = COALESCE(email, p_email),
            updatedat = CURRENT_TIMESTAMP
        WHERE "user".tblusers.userid = v_userid;
    END IF;

    -- 3. Check for existing creator profile
    SELECT c.creatorid INTO v_creatorid
    FROM creator.tblcreators c
    WHERE c.userid = v_userid
    LIMIT 1;

    -- 4. Return unified session attributes
    RETURN QUERY
    SELECT 
        v_userid AS user_id,
        COALESCE(v_creatorid, 0) AS creator_id,
        p_role_id AS role_id,
        p_username::VARCHAR AS user_name,
        COALESCE(v_name, p_username)::VARCHAR AS name,
        COALESCE(p_email, '')::VARCHAR AS email;
END;
$$;

-- 6. FUNCTION: creator.fn_create_creator
-- Provisions a creator profile in creator.tblcreators linked to an existing user.
CREATE OR REPLACE FUNCTION creator.fn_create_creator(
    p_userid INT,
    p_slug VARCHAR,
    p_name VARCHAR,
    p_categoryid INT DEFAULT 1,
    p_bio TEXT DEFAULT NULL,
    p_description TEXT DEFAULT NULL
)
RETURNS TABLE(
    creator_id INT,
    slug VARCHAR,
    name VARCHAR,
    status TEXT,
    msg TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_creatorid INT;
    v_clean_slug VARCHAR;
    v_slug_suffix INT := 1;
BEGIN
    -- Check if creator profile already exists for user
    SELECT c.creatorid, c.slug, c.name INTO v_creatorid, v_clean_slug, p_name
    FROM creator.tblcreators c
    WHERE c.userid = p_userid
    LIMIT 1;

    IF v_creatorid IS NOT NULL THEN
        RETURN QUERY SELECT v_creatorid, v_clean_slug, p_name, '0'::TEXT, 'Creator profile already exists.'::TEXT;
        RETURN;
    END IF;

    -- Clean and ensure unique slug
    v_clean_slug := LOWER(REGEXP_REPLACE(COALESCE(p_slug, 'creator'), '[^a-zA-Z0-9_-]', '', 'g'));
    IF v_clean_slug = '' THEN
        v_clean_slug := 'creator';
    END IF;

    WHILE EXISTS (SELECT 1 FROM creator.tblcreators WHERE creator.tblcreators.slug = v_clean_slug) LOOP
        v_clean_slug := v_clean_slug || v_slug_suffix::TEXT;
        v_slug_suffix := v_slug_suffix + 1;
    END LOOP;

    INSERT INTO creator.tblcreators (
        userid, slug, name, categoryid, bio, description, isverified, createdat, isactive
    )
    VALUES (
        p_userid, v_clean_slug, COALESCE(p_name, v_clean_slug), p_categoryid, p_bio, p_description, FALSE, CURRENT_TIMESTAMP, TRUE
    )
    RETURNING creator.tblcreators.creatorid INTO v_creatorid;

    RETURN QUERY
    SELECT v_creatorid, v_clean_slug, p_name, '0'::TEXT, 'Creator profile successfully created.'::TEXT;
END;
$$;

-- 7. FUNCTION: analytics.fn_submit_onboarding
-- Records onboarding survey analytics and optionally provisions the creator profile.
CREATE OR REPLACE FUNCTION analytics.fn_submit_onboarding(
    p_userid INT,
    p_referral_source VARCHAR,
    p_intended_use VARCHAR,
    p_metadata JSONB DEFAULT '{}'::jsonb,
    p_creator_slug VARCHAR DEFAULT NULL,
    p_creator_name VARCHAR DEFAULT NULL,
    p_categoryid INT DEFAULT 1,
    p_bio TEXT DEFAULT NULL
)
RETURNS TABLE(
    onboarding_id INT,
    creator_id INT,
    status TEXT,
    msg TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_onboarding_id INT;
    v_creatorid INT := 0;
BEGIN
    -- Insert onboarding survey response
    INSERT INTO analytics.tbluseronboarding (
        userid, referral_source, intended_use, metadata, createdat
    )
    VALUES (
        p_userid, p_referral_source, p_intended_use, p_metadata, CURRENT_TIMESTAMP
    )
    RETURNING analytics.tbluseronboarding.onboardingid INTO v_onboarding_id;

    -- If user intended to open a creator page or supplied creator details, provision creator profile
    IF p_intended_use = 'creator_page' OR p_creator_slug IS NOT NULL OR p_creator_name IS NOT NULL THEN
        SELECT cc.creator_id INTO v_creatorid
        FROM creator.fn_create_creator(
            p_userid,
            COALESCE(p_creator_slug, 'creator-' || p_userid::TEXT),
            p_creator_name,
            p_categoryid,
            p_bio,
            NULL
        ) cc;
    END IF;

    RETURN QUERY
    SELECT v_onboarding_id, COALESCE(v_creatorid, 0), '0'::TEXT, 'Onboarding submitted successfully.'::TEXT;
END;
$$;
