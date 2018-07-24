import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import createHistory from 'history/createBrowserHistory';

import rootSaga from '../sagas/sagas';

const sagaMiddleWare = createSagaMiddleware();

export default () => {
    const middleWare = [
        sagaMiddleWare,
        routerMiddleware(createHistory())
    ];

    const store = createStore(
        connectRouter(createHistory())(rootReducer),
        composeWithDevTools(
            applyMiddleware(...middleWare)
        )
    );

    sagaMiddleWare.run(rootSaga);
    return store;
}