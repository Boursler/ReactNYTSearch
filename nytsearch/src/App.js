import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Searched from "./components/Searched";
import Nav from "./components/Nav";


const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Searched" component={Searched} />
       
      </Switch>
    </div>
  </Router>
);

export default App;
