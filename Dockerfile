FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies (none for this simple app)
RUN npm install --production

# Copy application code
COPY index.js ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Start the application
CMD ["node", "index.js"]
