FROM node

WORKDIR /usr/src/app

RUN npm install -g serve
RUN npm install -g forever

EXPOSE 3000
EXPOSE 3001

COPY package.json package.json
RUN npm install

COPY . .

RUN npm run build --production

WORKDIR /

CMD ["bash", "/usr/src/app/start.sh"]
