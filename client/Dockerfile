FROM node:16.14.0

RUN mkdir /client
WORKDIR /client
COPY . .
RUN npm i
ENTRYPOINT [ "npm" ]
CMD ["run", "start"]