import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import PaginatedList from './components/charlist';
import Chardetail from './components/chardetail';;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PaginatedList} />
        <Route exact path="/detail" component={Chardetail} />
      </Switch>
    </Router>
  );
}

export default App;