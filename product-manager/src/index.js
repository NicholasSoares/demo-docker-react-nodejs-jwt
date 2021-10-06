import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import localStore from './store/localStore';

ReactDOM.render(
    <Provider store={localStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);