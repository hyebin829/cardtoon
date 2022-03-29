FROM nginx

RUN mkdir /client
WORKDIR /client
RUN mkdir ./dist
ADD ./dist ./dist

RUN rm -rf /etc/nginx/conf.d
COPY ./nginx /etc/nginx


EXPOSE 80
CMD ["nginx","-g","daemon off;"]
