FROM node:16.14.0

RUN mkdir /server
WORKDIR /server
COPY . .
RUN npm i
ENTRYPOINT [ "npm" ]
CMD ["run", "dev"]