FROM node:20-alpine
WORKDIR /app

# Install libc compatibility layer for Next.js native binaries on Alpine
RUN apk add --no-cache libc6-compat

# Cache package manifests first
COPY package.json package-lock.json* ./

RUN npm install

# Copy application files
COPY . .

EXPOSE 3000

# Next.js telemetry disable (speeds up startup) + file-watcher polling for containers
ENV NEXT_TELEMETRY_DISABLED=1
ENV WATCHPACK_POLLING=true

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]