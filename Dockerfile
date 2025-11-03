# Base image
FROM node:22-alpine

# Set root working directory (optional)
WORKDIR /app

# Copy package.json files first to leverage caching
COPY package*.json ./
COPY backend/package*.json backend/
COPY shared/package*.json shared/

# Copy source code
COPY backend ./backend
COPY shared ./shared

WORKDIR /app/backend

# Install dependencies at root (for monorepo / workspaces)
RUN  npm install

# Generate Prisma client and build backend
RUN npm run prisma gen
RUN npm run build

# Expose port for EB
EXPOSE 3000
EXPOSE 5000
ENV PORT=3000

# Start the app when container runs
CMD ["npm", "run", "start"]