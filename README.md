<H1>Top-page cources API</H1>
Simple backend project on NestJs with Mongo Db.
  <ul>Realized:
     <li> auth / product/ review / top-pages  modules</li>
     <li> simle JWT authorization </li>
     <li> validation data</li>
     <li> mongo database</li>
     <li> api covered by tests</li>
  </ul>

## Tech Stack

## ![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js) ![NestJs](https://img.shields.io/badge/-NestJs-black?style=flat-square&logo=nestjs&logoColor=e0234e) ![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript) ![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb) ![Docker](https://img.shields.io/badge/-Docker-black?style=flat-square&logo=docker) ![Jest](https://img.shields.io/badge/-Jest-black?style=flat-square&logo=jest&logoColor=c03b13)

## Controllers and services

- Auth
- Product
- Review
- Top-pages

## Usage

Clone repository ->

```
$ docker build -t top-api .
```

after create image run server + mongo: ->

```
 $ docker-compose up
```

## Tests

For check test for api, please run:

```
$ npm run test:e2e
```

Read full report of passed/ fail tests on page here:

`/test-report.html`
