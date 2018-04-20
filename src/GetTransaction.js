import React, { Component } from 'react';
import Transaction from './Transaction'
import { Link } from 'react-router-dom';

class GetTransaction extends Component {
  constructor(props){
    super(props);

    this.state = {
      searched: false
    }
  }
  componentWillMount(){
    const hash = this.props.match.params.hash;
    this.setState({ hash: hash });
    fetch(`https://api.blockcypher.com/v1/btc/main/txs/${hash}`)
      .then(response => {
        if(!response.ok){
          throw Error();
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          found: true,
          searched: true,
          transactionJSON: json
        });
      })
      .catch(() => {
        this.setState({
          found: false,
          searched: true
        });
      });
  }

  render(){
    if(!this.state.searched){
      return(
        <div className="searchBox">
          <p> Loading... </p>
        </div>
      );
    }
    else{
      if(this.state.found){
        return(
          <Transaction json={this.state.transactionJSON} />
        );
      }
      else{
        return(
          <div className="searchBox">
            <p className="notFound"> Transaction: "{this.state.hash}" is not found! </p>
            <Link to="/Akcelerator-Task/"><button className="smallBackButton">Go Back</button></Link>
          </div>
        );
      }
    }
  }
}

export default GetTransaction;
