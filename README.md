#Codecharacter-Web

## Contents

- Setting Up
- Development
- Contributors

- Equip with React, ES6 & Babel 6
- Lint with ESlint and Airbnb's style sheet.
- Build with Webpack（support Webpack 1 & Webpack 2）
- Support [hot module replacement](https://webpack.github.io/docs/hot-module-replacement.html)
- Auto Open a new browser tab when Webpack loads, and reload the page when you modified the code
- Use [Commitizen](https://github.com/commitizen/cz-cli) to produce # Codecharacter-Web

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




commit message according to [AngularJS convention](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)
- Support git hook `pre-commit` used to lint and test your code
- Support git hook `commit-msg` used to lint your [commit message](https://github.com/kentcdodds/validate-commit-msg)
- Use [conventional-changelog](https://github.com/ajoslin/conventional-changelog) to generate `CHANGELOG.md`

