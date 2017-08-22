Pallid sturgeon demo
=====================

A demo of pallid sturgeon database.


Install the dependencies and start the server.

```
npm install
npm webpack (to start front end)
npm server (to start api server)
open http://localhost:8000
```

### Static Files

You can store static files like images, fonts, etc in the `assets` folder. When the app is built, assets will be copied into the build folder.

Do not directly modify the build folder.

For example, if you copy a file called my_image.png into the assets folder, once webpack builds and copies assets into build you can access it using `http://localhost:8000/build/my_image.png`.

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
