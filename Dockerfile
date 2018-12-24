# Build frontend
FROM node:8.14.0-alpine as frontend
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./client/package.json /app/package.json
RUN npm install --silent
#RUN npm install
RUN npm install react-scripts@1.1.1 -g --silent
COPY client/ /app/
RUN npm run build

FROM node:8.14.0-alpine
RUN mkdir -p /app/server
WORKDIR /app/server
ENV PATH /app/server/node_modules/.bin:$PATH
ENV PORT=5000
ENV NODE_ENV=production
ENV SERVE_STATIC=1

COPY server/package.json /app/server/package.json
RUN npm install --silent

COPY server /app/server
COPY --from=frontend /app/build /app/client/build

EXPOSE 5000
CMD [ "npm", "run", "start-prod" ]
