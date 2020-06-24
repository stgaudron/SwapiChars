import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PaginatedList from './components/charlist';
import Chardetail from './components/chardetail';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';

const theme= createMuiTheme({
  palette: {
    type: 'dark',
    primary: yellow,
    secondary: yellow,

    background: {
      default: "black",
      paper: "#222",
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={PaginatedList} />
            <Route exact path="/:name" component={Chardetail} />
          </Switch>
        </Router>
    </ThemeProvider>
  );
}

export default App;
