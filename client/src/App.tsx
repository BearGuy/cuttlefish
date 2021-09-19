import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './layouts/Home';
import Login from './layouts/Login';
import SignUp from './layouts/SignUp';
import AuthProvider from './utils/auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/auth/login">
            <Login />
          </Route>
          <Route exact path="/auth/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
