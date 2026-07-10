# ==========================================
# Stage 1: Build the application
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install ALL dependencies (we need devDependencies like typescript to build)
RUN npm install

# Copy Prisma schema and generate the Prisma Client
COPY prisma ./prisma/
RUN npm run prisma:generate

# Copy the rest of the application code
COPY . .

# IMPORTANT: I noticed your "build" script uses "rimraf".
# If rimraf isn't in your package.json, this will fail in Docker.
# As a safety net, we install it globally just for the build process here:
RUN npm install -g rimraf
RUN npm run build

# ==========================================
# Stage 2: Production environment
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy only what's necessary from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose the port your app runs on
EXPOSE 8000

# Start the application using your production script
CMD ["npm", "run", "start:prod"]
