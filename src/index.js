import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {BrowserRouter as Router}  from 'react-router-dom'

import './index.css'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './reducers'

import ReactRouter from './router/router'

const enhancers = []

const middleware = [
    thunk
]

// ONLY FOR DEBUGGING
if (window.devToolsExtension) {
    // Chrome Redux DevTool extension
    enhancers.push(window.devToolsExtension())
}

const store = createStore(
    rootReducer,
    {},
    compose(
        applyMiddleware(...middleware),
        ...enhancers
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ReactRouter />
        </Router>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
