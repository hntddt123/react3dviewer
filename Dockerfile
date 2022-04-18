# Stage 1
# Linux x64
FROM node:current-alpine AS build

LABEL org.opencontainers.image.title="react3dviewer" \
      org.opencontainers.image.description="ReactThreeFiber Playground" \
      org.opencontainers.image.authors="@hntddt1"

# Create directory in container image for app code
RUN mkdir -p /usr/src/app

# Copy app code (.) to /usr/src/app in container image
COPY . /usr/src/app

# Set working directory context
WORKDIR /usr/src/app

# Install dependencies from packages.json
RUN npm install
RUN npm run build

# Stage 2
FROM nginx:stable-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Port outside connects PUBLISHED PORT:EXPOSE PORT
# Command for container to execute
CMD ["nginx", "-g", "daemon off;"]