FROM node
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
ADD . /app/
EXPOSE 8080