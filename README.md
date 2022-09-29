# NEXTJS E-Commerce App

To Run locally, a database is needed. Use the following command:

```
docker-compose up -d
```

MongoDB local url:

```
mongodb://localhost:27017/teslodb
```

Then, to run Application:

```
yarn install
yarn dev
```

## Config environment variables

Rename file .env.example to .env

## Fill DataBase with test data

```
GET
http://localhost:3000/api/seed
```
