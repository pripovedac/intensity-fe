import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware, ConnectedRouter} from 'connected-react-router'
import rootReducer from './store/reducers/index'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './store/sagas/index'
import {composeWithDevTools} from 'redux-devtools-extension';
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import Routes from './routes/routes'
import * as serviceWorker from './serviceWorker'
import './index.css';

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer(history),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware
        )
    )
)

sagaMiddleware.run(rootSaga)
store.runSaga = sagaMiddleware.run

function IntensityApp() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Router history={history}>
                    <Routes/>
                </Router>
            </ConnectedRouter>
        </Provider>
    )
}

const root = document.getElementById('root')

ReactDOM.render(<IntensityApp/>, root);

serviceWorker.unregister();
