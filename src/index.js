import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './store/reducers/index'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './store/sagas/index'
import {composeWithDevTools} from 'redux-devtools-extension';
import {createBrowserHistory} from 'history'
import {Router} from 'react-router-dom'
import Routes from './routes/routes'
import * as serviceWorker from './serviceWorker'
import './index.css';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)
store.runSaga = sagaMiddleware.run

const history = createBrowserHistory()

function IntensityApp() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Routes/>
            </Router>
        </Provider>
    )
}

const root = document.getElementById('root')

ReactDOM.render(<IntensityApp/>, root);

serviceWorker.unregister();
