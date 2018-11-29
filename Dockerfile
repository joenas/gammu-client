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
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
#RUN npm install
COPY app.js /app
COPY db.js /app

COPY --from=frontend /app/build /app/client/build

ENV PORT=5000
ENV NODE_ENV=production
ENV SERVE_STATIC=1
EXPOSE 5000
CMD [ "npm", "start" ]
