import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

// array is created because applyMiddleware takes in infinite number of arguments.
// By creating an array, we can spread the array and apply multiple middlewares in the future.
const middleware = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);

export default { store, persistor };
