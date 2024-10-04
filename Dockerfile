# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if you have one)
COPY package.json ./
# If you have a pnpm-lock.yaml, uncomment the next line
COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Expose the application port (change if necessary)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]
