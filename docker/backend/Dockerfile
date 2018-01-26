FROM node

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g forever

RUN npm install

EXPOSE 3001
CMD ["forever", "start", "./api/bin/www"]
