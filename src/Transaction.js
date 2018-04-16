import React, { Component } from 'react';
const kilo = 1000;

const satoshiToBTC = (satoshiNum) => {
  const satoshiInBTC = 1e8;
  const BTCNum = satoshiNum / satoshiInBTC;
  return BTCNum + " BTC";
}

const formatDate = (date) => {
  return date.replace("T", " ").slice(0, -5);
}

class DataTable extends Component {
  constructor(props){
    super(props);

    this.state = {table: props.table};
  }

  render(){
    let rows = [];
    for(let rowNum = 0; rowNum < this.state.table.length; rowNum++){
      const description = this.state.table[rowNum][0];
      const value = this.state.table[rowNum][1];
      rows.push(<dl><dd>{description}</dd><dt>{value}</dt></dl>);
    }
    return(
      <div className="abstractTable">{rows}</div>
    );
  }
}

class Transaction extends Component {
  constructor(props){
    super(props);

    let inputs = [];
    let outputs = [];
    let totalInput = 0;
    const feesRate =
      satoshiToBTC(props.json.fees * kilo / props.json.size) + "/KB";

    if(props.json.inputs[0].hasOwnProperty("addresses")){
      for(let inNr in props.json.inputs){
        const address = props.json.inputs[inNr].addresses[0];
        const value = props.json.inputs[inNr].output_value;

        inputs.push(<li><span className="left">{address}</span>
          <span className="right">{satoshiToBTC(value)}</span></li>);
        totalInput += value;
      }
    }
    else{
      inputs.push(<li><span className="left">No inputs (new coins generated)</span></li>);
    }

    for(let outNr in props.json.outputs){
      let address;
      if(props.json.outputs[outNr].addresses){ // Adress can be null
        address = props.json.outputs[outNr].addresses[0];
      }
      else{
        address = "Unparsed address";
      }
      const value = satoshiToBTC(props.json.outputs[outNr].value);

      outputs.push(<li><span className="left">{address}</span>
        <span className="right">{value}</span></li>);
    }

    const firstTable = [
      ["Total value", satoshiToBTC(props.json.total)],
      ["Confirmations:", props.json.confirmations],
      ["Block:", props.json.block_height],
      ["Received:", formatDate(props.json.received)]];
    const secondTable = [
      ["Total inputs:", satoshiToBTC(totalInput)],
      ["Size:", props.json.size + " (Bytes)"],
      ["Fees:", satoshiToBTC(props.json.fees)],
      ["Fees rate:", feesRate]];

    this.state = {
      hash: props.json.hash,
      firstTable: firstTable,
      secondTable: secondTable,
      inputs: inputs,
      outputs: outputs,
      totalInput: satoshiToBTC(totalInput),
      totalOutput: satoshiToBTC(props.json.total)
    };
  }

  unmount = () => {
    this.props.unmount();
  }

  render(){
    return (
      <div className="transaction">
        <div className="transactionHeader">
          <span className="header-message">Bitcoin Transaction:</span>
          <span className="transaction-hash">{this.state.hash}</span>
        </div>
        <div className="details">
          <DataTable table={this.state.firstTable}/>
          <DataTable table={this.state.secondTable}/>
        </div>
        <div className="addresses">
          <div className="addresses-header">
            <div className="addresses-header-title">
              <span className="left">Inputs ({this.state.inputs.length})</span>
              <span className="right">{this.state.totalInput}</span>
            </div>
            <div className="addresses-header-title">
              <span className="left">Outputs ({this.state.outputs.length})</span>
              <span className="right">{this.state.totalOutput}</span>
            </div>
          </div>
          <div className="addresses-body">
            <ul>{this.state.inputs}</ul>
            <ul>{this.state.outputs}</ul>
          </div>
        </div>
        <button className="backButton" onClick={this.unmount}>Go back</button>
      </div>
    );
  }
}

export default Transaction
