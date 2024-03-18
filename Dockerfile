FROM node:20-buster-slim

RUN apt update && apt -y upgrade

RUN mkdir /peasy_app

COPY . /peasy_app


WORKDIR /peasy_app

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/peasy_app/entrypoint.sh" ]
