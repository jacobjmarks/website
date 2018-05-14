FROM node:6-slim
ADD . /app/
WORKDIR /app/
EXPOSE 3000
RUN npm install
CMD npm start
