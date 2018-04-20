import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Searching extends Component {
  constructor(props){
    super(props);
    this.state = {
      hashValue: '0',
      transactionNotFound: false
    }
  }
  _clickSearch = () => {
    this.setState({
      submitted: true
    });
  }
  _handleTextAreaChange = (e) => {
    this.setState({hashValue: e.target.value});
  }
  _handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.setState({
        submitted: true
      });
    }
  }
  render() {
    if(this.state.submitted){
      return (
        <Redirect to={`/transaction/${this.state.hashValue}`} />
      )
    }
    else{
      return (
        <div className="searchBox">
          <p className="searchMessage">Search for transaction:</p>
          <input onChange={this._handleTextAreaChange}
            onKeyPress={this._handleKeyPress}
            placeholder="Transaction hash..."></input>
          <button className="searchButton" onClick={this._clickSearch}>
            Search</button>
        </div>
      );
    }
  }
}

export default Searching;
