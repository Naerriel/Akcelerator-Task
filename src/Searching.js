import React, { Component } from 'react';

class Searching extends Component {
  constructor(props){
    super(props);
    this.state = {
      hashValue: '0',
      transactionNotFound: false
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
        this.setState({transactionNotFound: true});
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
        {this.state.transactionNotFound ? <p>Transaction not found.</p> : null}
      </div>
    );
  }
}

export default Searching;
