import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import Store from './store'
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

window.store = Store;

ReactDOM.render(
    <Provider store={Store}>
        <Router>
            <React.StrictMode>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </React.StrictMode>
        </Router>
    </Provider>,
    document.getElementById('root')
);


