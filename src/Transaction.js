import React, { Component } from 'react';
import { sha256 } from 'js-sha256';
const kilo = 1000;

const satoshiToBTC = (satoshiNum) => {
  const satoshiInBTC = 1e8;
  const BTCNum = satoshiNum / satoshiInBTC;
  return BTCNum + " BTC";
}

const formatDate = (iso8601_date) => {
  return iso8601_date.replace("T", " ").slice(0, -5);
}

class DataTable extends Component {
  constructor(props){
    super(props);

    this.state = {table: props.table};
  }

  render(){
    let rows = [];
    for(let rowNum in this.state.table){
      const description = this.state.table[rowNum][0];
      const value = this.state.table[rowNum][1];
      rows.push(<dl key={sha256(description)}><dd>
        {description}</dd><dt>{value}</dt></dl>);
    }
    return(
      <div className="abstractTable">{rows}</div>
    );
  }
}

class Transaction extends Component {
  totalInput = 0;

  constructor(props){
    super(props);

    const inputs = this._init_inputs(props.json.inputs);
    const outputs = this._init_outputs(props.json.outputs);;
    const feesRate =
      satoshiToBTC(props.json.fees * kilo / props.json.size) + "/KB";

    const mainInfoTable = [
      ["Total value:", satoshiToBTC(props.json.total)],
      ["Confirmations:", props.json.confirmations],
      ["Block:", props.json.block_height],
      ["Received:", formatDate(props.json.received)]];
    const technicalInfoTable = [
      ["Total inputs:", satoshiToBTC(this.totalInput)],
      ["Size:", props.json.size + " (Bytes)"],
      ["Fees:", satoshiToBTC(props.json.fees)],
      ["Fees rate:", feesRate]];

    this.state = {
      hash: props.json.hash,
      mainInfoTable: mainInfoTable,
      technicalInfoTable: technicalInfoTable,
      inputs: inputs,
      outputs: outputs,
      totalInput: satoshiToBTC(this.totalInput),
      totalOutput: satoshiToBTC(props.json.total)
    };
  }

  _init_inputs = (inputs) => {
    const parsedInputs = [];
    if(inputs[0].hasOwnProperty("addresses")){
      for(let inNr in inputs){
        const address = inputs[inNr].addresses[0];
        const value = inputs[inNr].output_value;

        parsedInputs.push(<li key={sha256(address)}><span className="left">{address}</span>
          <span className="right">{satoshiToBTC(value)}</span></li>);
        this.totalInput += value;
      }
    }
    else{
      parsedInputs.push(<li key={sha256("No inputs")}>
        <span className="left">No inputs (new coins generated)</span></li>);
    }
    return parsedInputs;
  }

  _init_outputs = (outputs) => {
    const parsedOutputs = [];
    for(let outNr in outputs){
      let address;
      if(outputs[outNr].addresses){ // Adress can be null
        address = outputs[outNr].addresses[0];
      }
      else{
        address = "Unparsed address";
      }
      const value = satoshiToBTC(outputs[outNr].value);

      parsedOutputs.push(<li key={sha256(String(value + outNr))}>
        <span className="left">{address}</span>
        <span className="right">{value}</span>
        </li>);
    }
    return parsedOutputs;
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
          <DataTable table={this.state.mainInfoTable}/>
          <DataTable table={this.state.technicalInfoTable}/>
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
