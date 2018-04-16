import React, { Component } from 'react';
import Transaction from './Transaction'
import './App.css';

class Searching extends Component {
  constructor(props){
    super(props);
    this.state = {
      hashValue: '0',
      txNotFound: false
    }
  }
  clickSearch = () => {
    fetch(`https://api.blockcypher.com/v1/btc/main/txs/${this.state.hashValue}`)
      .then(response => {
        if(!response.ok){
          throw Error();
        }
        return response.json();
      })
      .then(json => {
        this.props.handleFindingTransaction(json);
      })
      .catch(() => {
        this.setState({txNotFound: true});
      });
  }
  handleTextAreaChange = (e) => {
    this.setState({hashValue: e.target.value});
  }
  render() {
    return (
      <div className="searchBox">
        <p>Search for transaction:</p>
        <textarea onChange={this.handleTextAreaChange}
           placeholder="Transaction hash..."></textarea>
        <button className="searchButton" onClick={this.clickSearch}>
          Search</button>
        {this.state.txNotFound ? <p>Transaction not found.</p> : null}
      </div>
    );
  }
}

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
      renderSearch: true,
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
