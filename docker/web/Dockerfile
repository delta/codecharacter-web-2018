FROM node

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g serve

RUN npm install

EXPOSE 2000
RUN npm run build --production

CMD ["serve", "-s", "build", "-p", "2000"]
