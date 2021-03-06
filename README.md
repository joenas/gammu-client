# gammu-client

This is a simple _Messages(iOS)_-like client (frontend & backend) for `gammu-smsd` with storage in `postgres`. It lets you view your inbox and send/reply to SMS.

For more info on using `gammu-smsd` on a Raspberry Pi 0 see [this blogpost](https://jonnev.se/raspberry-pi-zero-as-sms-gateway/).


## Content

- [Basic Auth](#basic-auth)
- [Install](#install)
- [Raspberry Pi Zero/1](#raspberry-pi-zero1)
- [Configure gammu-smsd](#configure-gammu-smsd)

## Basic Auth

To use Basic Auth, uncomment `GAMMU_CLIENT_USER` and `GAMMU_CLIENT_PASSWORD` in either `.env` or `docker-compose.yml` depending on how you deploy this.


## Install

If you already have gammu running with a postgres backend you can deploy this to any server capable of accessing that postgres instance.
It's also possible to just run the `server` for an simple API.

The server exposes 2 endpoints:
- `GET /api/sms` - Fetch all SMSes
- `POST /api/sms` - Send an SMS


### Local with npm

You can run both client and server directly with `npm`. For that you need to have an existing instance of Postgres.

#### Usage

```bash
# Setup .env
cp server/.env.example server/.env
nano server/.env

# Install deps
npm install

# To run server & client
npm start
```

#### Client (for building static files)

```bash
cd client

# Install deps
npm install

# Build static files, then you can start the server with SERVE_STATIC=1
npm run build

# To run client dev-server (hot reloading etc)
npm start
```

### Docker-compose

For a fresh install of `gammu-smsd` with no current postgres storage, set this up then [configure gammu-smsd](#configure-gammu-smsd) to use this database.

**This won't work on a Raspberry Pi Zero/1!**

```bash
# Start db
docker-compose up -d db

# Setup db
cat support/gammu.sql | docker-compose exec -T db psql -U smsd smsd

# Start client
docker-compose up -d web
```

## Raspberry Pi Zero/1

Since these are `armv6`, using Docker takes some effort. I haven't been able to get `docker-compose` to work for example.
It's possible(?) to clone this repo and build the image directly on the rpi0 but it takes ages.

My preferred method is to build it on macOS/Linux and [export](https://stackoverflow.com/a/23938978) the image as a tar.

If you have `npm` installed, it's possible to fetch all dependencies locally and then build the image.

**On your local machine**
```bash
# Build the armv6 image and save it to tar
./build_arm.sh

# Pass a hostname to transfer the file as well like:
./build_arm.sh -d host:/home/pi

# If you have NPM installed locally you can build the frontend
# and fetch node_modules, then copy them into the image (faster)
./build_arm.sh -l
```

**On your pi**
```bash
# Load the transfered tar
docker load -i gammu-client-armv6.tar
```

If you have a database running for gammu already, make sure it's accessible by ip and edit the `DATABASE_URL` below

```bash
docker run  -d --rm --name gammu-client \
            -p 5000:5000 \
            -e DATABASE_URL=postgres://smsd:smsd@10.0.0.1:5432/smsd \
            gammu-client:armv6
```

If you don't have a postgres already, run it in a container!

```
docker network create gammu
docker volume create gammu-db

docker run  -d --rm --name gammu-db \
            --network=gammu \
            -v gammu-db:/var/lib/postgresql/data \
            -e POSTGRES_DB=smsd \
            -e POSTGRES_USER=smsd \
            -e POSTGRES_PASSWORD=smsd \
            arm32v6/postgres:10.6-alpine

docker run  -d --rm --name gammu-client \
            -p 5000:5000 \
            --network=gammu \
            -e DATABASE_URL=postgres://smsd:smsd@gammu-db:5432/smsd \
            gammu-client:armv6

# Setup db schema
docker exec gammu-client cat gammu.sql | docker exec -i gammu-db psql -U smsd smsd
```

## Configure gammu-smsd

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

