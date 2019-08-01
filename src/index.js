import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserHistory } from 'history'
import {Router} from 'react-router-dom'
import Routes from './routes/routes'
import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory()

function IntensityApp() {
    return (
        <Router history={history}>
            <Routes/>
        </Router>
    )
}

const root =  document.getElementById('root')

ReactDOM.render(<IntensityApp/>, root);


serviceWorker.unregister();
