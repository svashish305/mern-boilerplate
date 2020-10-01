import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { render } from 'react-dom';

import { history } from '../history';
import { userService } from './services';
import App from './App';
import * as serviceWorker from './serviceWorker';

userService.refreshToken().finally(startApp);

function startApp() { 
    render(
        <Router history={history}>
            <App />
        </Router>,
        document.getElementById('app')
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
