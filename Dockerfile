FROM node:15.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ["npx", "prisma", "generate"]

# RUN ["npx", "prisma", "db", "push", "--preview-feature"]

# CMD ["npm", "run", "dev"]
