# Test web app that returns the name of the host/pod/container servicing req
# Linux x64
FROM node:current-alpine

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

# Port outside connects 9000:3000 in docker react default port is 3000
# Command for container to execute
CMD ["npm", "run", "start"]