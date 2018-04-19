import React, { Component } from 'react';
import Transaction from './Transaction'
import Searching from './Searching'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      renderSearch: true,
      transactionJSON: []
    };
  }
  handleFindingTransaction = (transactionJSON) => {
    this.setState({
      renderSearch: false,
      transactionJSON: transactionJSON
    });
  }
  unmountTransaction = () => {
    this.setState({
      renderSearch: true
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.renderSearch ?
          <Searching
            handleFindingTransaction={this.handleFindingTransaction}
          />
        :
          <Transaction
            json={this.state.transactionJSON}
            unmount={this.unmountTransaction}
          />
        }
      </div>
    );
  }
}

export default App;
