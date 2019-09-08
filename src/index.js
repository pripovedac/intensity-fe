import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import {routerMiddleware} from 'react-router-redux'
import persistedReducer from './store/reducers/index.reducer'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './store/sagas/index.saga'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import Routes from './routes/routes'
import * as serviceWorker from './serviceWorker'
import './index.css'

const history = createBrowserHistory()

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
                <Router history={history}>
                    <Routes />
                </Router>
            </PersistGate>
        </Provider>
    )
}

const root = document.getElementById('root')

ReactDOM.render(<IntensityApp/>, root);

serviceWorker.unregister();
