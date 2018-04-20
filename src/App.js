import React, { Component } from 'react';
import GetTransaction from './GetTransaction'
import Searching from './Searching'
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/Akcelerator-Task/" component={Searching} />
          <Route path="/Akcelerator-Task/transaction/:hash/" component={GetTransaction} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
