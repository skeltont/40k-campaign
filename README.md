# Warhammer 40k Campaign manager

## Install:
```
$ cd client; npm install
$ cd ../server; npm install
```

## Setup local environment file
```
$ touch server/.env

# .env
mongo_url="mongodb://user:pass@host:port"
```

## Seed database
```
$ mongorestore ./campaign40k --db campaign40k -u USER -p PASS --drop --authenticationDatabase admin
```
or
```
mongoimport --db campaign40k --collection gameStates --file gameStateSeed.json -u USER -p PASS --authenticationDatabase admin
```

## Run Client
```
npm start
```

## Run Server
```
npm run dev
```
