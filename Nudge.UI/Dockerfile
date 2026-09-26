FROM node:20-alpine
WORKDIR /app

# Copy dependency configs first to leverage Docker build cache
COPY package*.json ./
RUN npm install

# Copy the rest of the Next.js client files
COPY . .

# Expose NextJS development port
EXPOSE 3000

# Bind Next.js dev server to all interfaces so it's reachable from the host
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]