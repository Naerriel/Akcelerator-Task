import React, { Component } from 'react';

class DataTable extends Component {
  constructor(props){
    super(props);

    this.state = {table: props.table};
  }

  render(){
    let rows = [];
    for(let rowNum = 0; rowNum < this.state.table.length; rowNum++){
      let thisRow = [];
      for(let colNum = 0; colNum < this.state.table[rowNum].length; colNum++){
        thisRow.push(<td>{this.state.table[rowNum][colNum]}</td>);
      }
      rows.push(<tr>{thisRow}</tr>);
    }
    return(
      <table><tbody>{rows}</tbody></table>
    );
  }
}

class Transaction extends Component {
  constructor(props){
    super(props);

    let inputs = [];
    let outputs = [];
    let totalInput = 0;
    const feesRate = props.json.total / props.json.size;

    if(props.json.inputs[0].hasOwnProperty("addresses")){ //If BTC is created
      for(let inNr in props.json.inputs){
        const address = props.json.inputs[inNr].addresses[0];
        const value = props.json.inputs[inNr].output_value;
        inputs.push(<li><span className="left">{address}</span>
          <span className="right">{value}</span></li>);
        totalInput += value;
      }
    }

    for(let outNr in props.json.outputs){
      let address;
      if(props.json.outputs[outNr].addresses){ // Adress can be null
        address = props.json.outputs[outNr].addresses[0];
      }
      else{
        address = "Unparsed address";
      }
      const value = props.json.outputs[outNr].value;
      outputs.push(<li><span className="left">{address}</span>
        <span className="right">{value}</span></li>);
    }

    const firstTable = [
      ["Total value", props.json.total],
      ["Confirmations:", props.json.confirmations],
      ["Block:", props.json.block_height],
      ["Received:", props.json.received]]; // format this
    const secondTable = [
      ["Total inputs:", totalInput],
      ["Size:", props.json.size],
      ["Fees:", props.json.fees],
      ["Fees rate:", props.json.fees / (props.json.size / 1000)]];

    this.state = {
      hash: props.json.hash,
      firstTable: firstTable,
      secondTable: secondTable,
      inputs: inputs,
      outputs: outputs,
      totalInput: totalInput,
      totalOutput: props.json.total
    };
  }

  unmount = () => {
    this.props.unmount();
  }

  render(){
    return (
      <div className="transaction">
        <p>Bitcoin Transaction:</p>
        <p>{this.state.hash}</p>
        <DataTable table={this.state.firstTable}/>
        <DataTable table={this.state.secondTable} />
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
          <ul>{this.state.inputs}</ul>
          <ul>{this.state.outputs}</ul>
        </div>
        <button className="backButton" onClick={this.unmount}>Go back</button>
      </div>
    );
  }
}

export default Transaction
