# Backend ddd-and-cqs-level-2

## Vehicle fleet parking management - Full Application

### Prerequies

#### Technologies

1. Node.js
2. TypeScript
3. MongoDB with MongoDB native driver (mongodb package on NPM)
4. InversifyJS as an IoC container

### Installation

To run the project, make sure you have these dependencies installed on your system

1. Node.js v8 or later
2. Typescript with `tsc` command
3. Nodemon
4. ts-node
5. MongoDB

Use the package manager [npm](https://www.npmjs.com/package/npm) to install dependencies.

```bash
npm install
```

You also need to setup and initialise MongoDB database. Then, copy the `.env_example` file into `.env` file by firing the command

```bash
cp .env_template .env
```

Adjust the DB_NAME and MONGODB_URI to match your configuration then run

```bash
npm run dev
```

### Cucumber test

Launch cucumber test with the following command.

```bash
npm test
```

### Cli command line Application

#### Packaging

In order to make the application available in a single package, run

```bash
npm run package
```

then use it with the following commands

```shell
./fleet create <userId> # returns fleetId on the standard output
./fleet register-vehicle <fleetId> <vehiclePlateNumber>
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
```
