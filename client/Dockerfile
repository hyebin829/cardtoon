FROM nginx

RUN mkdir /client
WORKDIR /client
RUN mkdir ./dist
ADD ./dist ./dist


EXPOSE 80
CMD ["nginx","-g","daemon off;"]
