// https://node-postgres.com/guides/async-express
// https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
require('dotenv').config();

const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');
const routes = require('./routes/');

const app = express();
const port = process.env.PORT || 5000;

function clientErrorHandler(err, req, res, next) {
  console.error(err.stack);
  if (req.accepts(['html', 'json']) === 'json') {
    res.setHeader('content-type', 'application/json');
    res.status(500).send({ message: 'Something went wrong, check your logs' });
  } else {
    next(err);
  }
}

const user = process.env.GAMMU_CLIENT_USER;
const password = process.env.GAMMU_CLIENT_PASSWORD;
if (process.env.NODE_ENV === 'production' && user && password) {
  app.use(basicAuth({
    users: {
      [user]: password,
    },
    challenge: true,
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);


if (process.env.SERVE_STATIC === '1') {
  const staticFiles = express.static(path.join(__dirname, '..', 'client', 'build'));
  // Serve any static files
  app.use(staticFiles);
  // Handle React routing, return all requests to React app
  app.use('/*', staticFiles);
}

app.use(clientErrorHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));
