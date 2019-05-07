import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'
import Register from './components/Register'
import {SaveLocation} from './components/SaveLocation'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {BaseLayout} from './components/BaseLayout'
import {Login} from './components/Login'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route exact path ="/" component={App} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path="/save-location" component={SaveLocation} />
      </Switch>
    </BaseLayout>
    </BrowserRouter>
  </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
