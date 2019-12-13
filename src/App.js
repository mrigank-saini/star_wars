import React from 'react';
import classes from './App.module.css';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Search from './containers/Search/Search';

function App() {
  //1. Main Page - By default login
  //2. Search.js with Search Bar 
  return (
    <React.Fragment>
      <div className={classes.Container}>
        <header><h3>Welcome to Star Wars...</h3></header>
        <div className={classes.App}>
        <Switch>
          <Route path="/search" exact component={Search}/>
          <Route path="/" component={Login}/>
        </Switch>
        {/* <Redirect from="/" to="/login" /> */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
