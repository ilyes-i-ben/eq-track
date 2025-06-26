ARG UID=1001
ARG GID=1001

FROM node:20.19.0

WORKDIR /app

COPY --chown=${UID}:${GID} package*.json .

RUN npm install -g @nestjs/cli
RUN npm install

COPY --chown=${UID}:${GID} . .

CMD [ "npm", "run", "start:dev" ]