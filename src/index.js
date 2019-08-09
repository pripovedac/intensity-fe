import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
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

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer(history))

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware
        )
    )
)

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
store.runSaga = sagaMiddleware.run

function IntensityApp() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <Router history={history}>
                        <Routes/>
                    </Router>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    )
}

const root = document.getElementById('root')

ReactDOM.render(<IntensityApp/>, root);

serviceWorker.unregister();
