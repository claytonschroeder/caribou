// Application entrypoint.

// Load up the application styles
require("./styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import es6promise from 'es6-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();
es6promise.polyfill();

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('react-root'));