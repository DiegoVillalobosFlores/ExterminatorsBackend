# Exterminators Coding Challenge
Backend coding challenge for Exterminators

## Made with Node + TS + Fastify
Deployed under GCP with Cloud build and Cloud run

### Architecture
This project follows a micro-service architecture where the data processing
(services) and the server (api) logic are separated and managed independently of each other.

The folder architecture has the following form:

```text
- src
  - api
    - Contains the routes that will be passed to a server
  - mock
    - Contains the mock data necessary for tests
  - server
    - Contains the implementation of the exposing servers
  - services
    - Contains the different services that handle the data
  - tests
    - Contains the unit tests for all the other files
  - types
    - Contains the typescript types that will be shared in the project
```

### Setup
The project only uses two `.env` variables:

```text
- PORT
    - The port where the server will run
    - Default: 8080
- HOST
    - The host where the server will run
    - Default: 0.0.0.0
```

### Development and run
#### Install
This project has a `yarn.lock` file which means the use of `yarn` is necessary

```text
yarn
```

#### Run
The server can be run by invoking the `start` script

```text
yarn start
```

or by running it in Docker:

```text
docker build -t backend-challenge:1.0.0 . && docker run -d -p 3000:3000 --name challenge backend-challenge:1.0.0
```

#### Compile
The project is compiled with TypeScript so the TSC is used

```text
yarn compile
```

#### Tests
This project uses [AVA](https://github.com/avajs/ava) as its test framework.

To run all tests:

```text
yarn test
```

To run the tests in watch mode:

```text
yarn watch
```

To check code-coverage:

```text
yarn coverage
```

### Server API

`/checkout` `Type: POST`

Accepts a JSON body with an array of strings of the product IDs

```js
body = [
  "001",
  "002"
]
```

`Returns:`

```js
{
  price: 360
}
```

`Example:`

```js
body = [
    "001",
    "002",
    "001",
    "004",
    "003"
];

result = {
  price: 360
}
```

`Hosted on:` [Cloud Run](https://server-exterminators-3tjgunuy5a-ew.a.run.app/checkout)
