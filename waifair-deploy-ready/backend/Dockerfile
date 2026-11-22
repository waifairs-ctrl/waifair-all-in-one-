# Production Dockerfile for Waifair Backend API (Railway & Render Ready)
FROM node:20-alpine AS runner

# Create app directory
WORKDIR /app

# Install curl for container health check
RUN apk add --no-cache curl

# Copy dependency manifests
COPY package.json ./

# Install production dependencies cleanly
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Set default production environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port (Render & Railway inject their own PORT at runtime)
EXPOSE 5000

# Docker healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT}/health || exit 1

# Start server
CMD ["node", "server.js"]
