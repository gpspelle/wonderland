import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './App.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Login from './components/Login.js';
import Home from './components/Home.js';
import Logout from './components/Logout.js';

import { loadToken, saveToken, clearLocalStorage } from './localStorage.js';

function updateReducer(token, action) {
  switch (action.type) {
    default:
      return Object.assign({}, persistedToken, {
        token: token
      });
  }
}

const persistedToken = loadToken();

function App() {

  const store = createStore(updateReducer, persistedToken);

  let props = {
    saveToken: saveToken,
    clearLocalStorage: clearLocalStorage
  };

  if(persistedToken == null) {
    return <Login {...props} />
  };
  return (

    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route render={() => <Redirect to={{pathname: "/"}} />} />
        </Switch>
        <Home/>
        <br />
        
        <Logout {...props} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;