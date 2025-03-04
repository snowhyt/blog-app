#node version 
FROM node:18

#working dir
WORKDIR /usr/src/app

#package files
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

#installation of dependencies
RUN npm install

#copying the other resources
COPY . .

#port
ARG PORT=3000
EXPOSE $PORT

#starting the app
CMD ["npm", "run", "dev"]
