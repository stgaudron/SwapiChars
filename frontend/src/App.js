import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PaginatedList from './components/charlist';
import Chardetail from './components/chardetail';;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PaginatedList} />
        <Route exact path="/:name" component={Chardetail} />
      </Switch>
    </Router>
  );
}

export default App;
