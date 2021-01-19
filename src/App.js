import React, { useState } from 'react';
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

  // Declaration du token
  const [isLoggedIn, setIsLoggedIn]= useState(loadToken() === null);
  const saveAndUpdateToken = (newToken, loggedIn) => {
    saveToken(newToken);
    setIsLoggedIn(loggedIn);
  }

  let props = {
      saveToken: saveAndUpdateToken,
      clearLocalStorage: clearLocalStorage
    };

  const store = createStore(updateReducer, persistedToken);

  return !isLoggedIn ? <Login {...props} /> :
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
}

export default App;