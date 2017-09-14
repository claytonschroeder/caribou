Caribou Demo
=====================

A demo of BC Caribou herd data.


Install the dependencies and start the server.

```
npm install
npm run webpack (to start front end)
npm run server (to start api server)
open http://localhost:8000

other options:
npm start (builds the webpack and starts api server)
npm build (rebuilds the build folder)
```

### Static Files

You can store static files like images, fonts, etc in the `assets` folder. When the app is built, assets will be copied into the build folder.

Do not directly modify the build folder.

For example, if you copy a file called my_image.png into the assets folder, once webpack builds and copies assets into build you can access it using `http://localhost:8000/build/my_image.png`.

### Database Config

You will need to configure your personal database credentials in a .env file.

DB_NAME=[your database name]
DB_USERNAME=[your username]
DB_PASSWORD=[your password]

!!!THIS VERSION CURRENTLY RELIES ON SEEDED DATA!!!

migrate the latest version of the database by executing:
  npm run knex migrate:latest
Then seed the database by executing:
  npm run knex seed:run

### To mig ate and seed production database

  NODE_ENV=production npm run knex migrate:latest
  NODE_ENV=production npm run knex seed:run

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
