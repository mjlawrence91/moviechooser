FROM node:lts

# Create app directory.
WORKDIR /usr/src/app

# Install app dependencies.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./
RUN npm install -g pm2
RUN npm install

# Bundle app source.
COPY . .

# Build application.
RUN npm run build

EXPOSE 8000

# CMD [ "npm", "start" ]
CMD [ "NODE_CONFIG_DIR=dist/config", "pm2-runtime", "start", "dist/index.js", "-i", "max" ]
