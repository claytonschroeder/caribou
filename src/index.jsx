// Application entrypoint.

// Load up the application styles
require("./styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import es6promise from 'es6-promise';
es6promise.polyfill();

ReactDOM.render(<App />, document.getElementById('react-root'));