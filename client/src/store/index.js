import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from 'redux-devtools-extension';


const persistConfig = {
  key: "root",
  storage,
};

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)));
// const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;