import React, { Component } from 'react';
import './App.css';

class Transaction extends Component {
  constructor(props){
    super(props);
    this.state = {
      hash: props.hash
    };
  }
  unmount = () => {
    this.props.unmount();
  }
  render(){
    return (
      <div className="transaction">
        <p>My hash is:{this.state.hash}</p>
        <button onClick={this.unmount}>Go back</button>
      </div>
    );
  }
}

class Searching extends Component {
  constructor(props){
    super(props);
    this.state = {
      hashValue: '0'
    }
  }
  clickSearch = () => {
    this.props.handleSearch(this.state.hashValue);
  }
  handleTextAreaChange = (e) => {
    this.setState({hashValue: e.target.value});
  }
  render() {
    return (
      <div className="searchBox">
        <p>Search for transaction:</p>
        <textarea onChange={this.handleTextAreaChange} placeholder="Transaction hash..."></textarea>
        <button className="searchButton" onClick={this.clickSearch}>Search</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      renderSearch: true,
      transactionHash: "0"
    };
  }
  handleSearch = (transactionHash) => {
    console.log(transactionHash);
    this.setState({
      renderSearch: false,
      transactionHash: transactionHash
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
            handleSearch={this.handleSearch}
          />
        :
          <Transaction
            hash={this.state.transactionHash}
            unmount={this.unmountTransaction}
          />
        }
      </div>
    );
  }
}

export default App;
