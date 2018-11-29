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

## Raspberry Pi Zero/1

Since these are `armv6`, using Docker takes some effort. I haven't been able to get `docker-compose` to work for example.
It's possible(?) to clone this repo and build the image directly on the Rpi0 but it takes ages.

My preferred method is to build it on macOS/Linux and [export](https://stackoverflow.com/a/23938978) the image as a tar.

It would look something like this, assuming you have cloned this repo and has `npm` installed.

```bash
# Install node_modules for server
npm install
# Install node_modules for client
cd client && npm install && cd ..

# Build and save the image
docker build -t gammu-frontend:armv6 -f Dockerfile.armv6 .
docker save -o gammu-frontend-armv6.tar gammu-frontend:armv6
scp gammu-frontend-armv6.tar yourpi:/home/pi/

# On your pi
docker load -i gammu-frontend-armv6.tar

# If you have a database running for gammu already, make sure it's accessible by ip
# and edit the DATABASE_URL below
docker run -d --rm --name gammu-frontend -p 5000:5000 -e DATABASE_URL=postgres://smsd:smsd@gammu-db:5432/smsd gammu-frontend:armv6


# If you don't have a postgres already, run it in a container!
docker network create gammu
docker volume create gammu-db

docker run -d --rm --name gammu-db --network=gammu -v gammu-db:/var/lib/postgresql/data -e POSTGRES_DB=smsd -e POSTGRES_USER=smsd -e POSTGRES_PASSWORD=smsd arm32v6/postgres:10.6-alpine
docker run -d --rm --name gammu-frontend -p 5000:5000 --network=gammu -e DATABASE_URL=postgres://smsd:smsd@gammu-db:5432/smsd gammu-frontend:armv6
docker exec gammu-frontend cat gammu.sql | docker exec -i gammu-db psql -U smsd smsd
```

### Configure gammu

After creating the containers you need to configure your `gammu-smsd` to use postgres.

```
# /etc/gammu-smsdrc
[smsd]
logfile = /var/log/gammu-smsd.log
service = sql
driver = native_pgsql
host = localhost
user = smsd
password = smsd
database = smsd
```

### Version issues with gammu

Depending on your version of `gammu-smsd` you might need to change the value of `Version` in the database `gammu`.
The schema used in the docker container is version 17.

```
# Enter the container
docker exec -it gammu-db psql -U smsd

# Delete new version and insert older
smsd=# delete from gammu where "Version" = 17;
smsd=# insert into gammu ("Version") values (16);
```


## Contributing

1. Fork it ( https://github.com/joenas/gammu-client/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## Contributors

- [joenas](https://github.com/joenas) joenas - creator, maintainer

