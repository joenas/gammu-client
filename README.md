# gammu-frontend

### Usage


## Local with npm

You can run both client and server directly with `npm`. For that you need to have an existing instance of Postgres.

### Server

```bash
# Setup .env
cp .env.example .env
nano .env

# Install deps
npm install

# To run server
npm start
```

### Client

```bash
cd client

# Install deps
npm install

# To run server
npm start
```

## Docker-compose

```bash
# Start db
docker-compose up -d db

# Setup db
cat support/gammu.sql | docker-compose exec -T db psql -U smsd smsd

# Start backend (uncomment in docker-compose.yml if you have frontend in /public)
docker-compose up -d web
```


## Contributing

1. Fork it ( https://github.com/joenas/gammu-client/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## Contributors

- [joenas](https://github.com/joenas) joenas - creator, maintainer

```
