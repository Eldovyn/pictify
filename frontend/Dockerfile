# Stage 1: Build the Vue application
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy configuration files and install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the rest of the application files and build
COPY . .
RUN bun run build

# Stage 2: Serve the application
FROM oven/bun:1-alpine

WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/dist ./dist

# Install 'serve' globally via Bun to host the static files
RUN bun install -g serve

# Expose the default port used by serve
EXPOSE 3000

# Start the server with SPA routing mode enabled (-s)
CMD ["serve", "-s", "dist", "-l", "3000"]
