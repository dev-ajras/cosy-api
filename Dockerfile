FROM node

WORKDIR usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

COPY src/images ./images

EXPOSE 3000
CMD ["npm", "run", "dev"]