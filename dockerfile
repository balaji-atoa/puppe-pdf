# Dockerfile
FROM node:18.18-alpine3.18

RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  ttf-freefont

# Set the Puppeteer environment variables for Chrome binary location
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install dependencies and Puppeteer
WORKDIR /usr/app
COPY package.json ./
COPY ./src ./src
COPY ./examples ./examples
RUN npm install

# Run the app
EXPOSE 3000
CMD ["node", "examples/express.js"]
