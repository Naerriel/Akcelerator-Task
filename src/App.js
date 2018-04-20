import React, { Component } from 'react';
import GetTransaction from './GetTransaction'
import Searching from './Searching'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Searching} />
          <Route path="/transaction/:hash" component={GetTransaction} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
