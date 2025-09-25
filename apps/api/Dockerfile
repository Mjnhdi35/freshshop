FROM node:18-alpine AS base
WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy source and build
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]


