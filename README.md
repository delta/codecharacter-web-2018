# Codecharacter-Web

Front End and Api to the infamous Codecharacter Game.

## Contents

- [Technology](https://github.com/delta/codecharacter-web/#technology)
- [Setup](https://github.com/delta/codecharacter-web/#setup)
- [Development](https://github.com/delta/codecharacter-web/#development)
- [Contributors](https://github.com/delta/codecharacter-web/#contributors)

## Technology

### Backend

- Express 4.0.0
- MySQL 1.4.2
- Nodemon 1.12.1

Refer api/package.json for other dependencies.

### Frontend

- React 16.2.0
- React-Redux 5.0.6
- Redux-Saga 0.16.0

Refer app/package.json for other dependencies.

## Setup

- Clone the Repo

``` git clone https://github.com/delta/codecharacter-web.git ```


### Backend
 

``` cd codecharacter-web/api ```

Install required Node Modules 

``` npm install ```

Install migrations

``` ./node_modules/.bin/sequelize db:migrate  ```

Run the API Server (Run it on port 3000)

``` npm start ```

### Frontend

``` cd codecharacter-web/app ```

Install required Node Modules

``` npm install ```

Start the server

``` npm start ```

## Development

- Committing /app - ``` git commit -m "commit_message" --no-verify ```

## Contributors

- [Venkatraman Srikanth](https://github.com/venkat24)
- [Shivashis Padhi](https://github.com/plant99)
- [Sai Hemanth](https://github.com/shb9019)

Made with :heart: by [Delta](https://github.com/delta)

