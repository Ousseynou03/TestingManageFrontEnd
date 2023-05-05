FROM node:18.14.1

RUN mkdir -p /app


WORKDIR /app

COPY . .

RUN npm install -g @angular/cli@15.1.6

RUN npm install @angular-devkit/build-angular --force

EXPOSE 4200

CMD ["npm", "start"]
