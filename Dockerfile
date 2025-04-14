# Use official Bun image
FROM oven/bun:slim

# Set working directory
WORKDIR /app

# Copy dependencies first for caching
COPY bun.lock package.json ./

# Install dependencies
RUN bun install

# Copy the rest of the code
COPY . .

# Command to run your Bun app (adjust if needed)
CMD ["bun", "run", "start"]