import React, { Component } from 'react';
import logo from './logo.svg';
import logo2 from './logo2.svg';
import './App.css';
import web3 from './web3';
import { Button } from 'reactstrap';
import IPFS from './ipfs';
import QrCode from 'react.qrcode.generator'
import QrReader from "react-qr-reader";
import OldLBabi from "./OldLBabi.json";
class Sellers extends Component {
  constructor(props) {
    super(props);
    this.state = {
       buffer:'',
    ipfsHash:null,
    myContract: null,
    account: '',
    contractadd:'',
    qrAdd:'',
    g: false,
    r: false,
    qr: false,
    delay: 300,
    result: ''
    };
    this.handleScan = this.handleScan.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

   componentDidMount = async (event) => {
  const accounts = await web3.eth.getAccounts();
   this.setState({account:accounts[0]});
};


 handleScan(data) {
    if (data) {
      this.setState({
        result: data
      });
    }
  };
    handleChange(event) {
    this.setState({result: event.target.value});
  }
  handleError(err) {
    console.error(err);
  };
  onScan = async(event) => {
    event.preventDefault();
     this.setState({qr:true});
 };
  captureFile =(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)    
  };//Capture File

convertToBuffer = async(reader) => {
  //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
  //set this buffer -using es6 syntax
    this.setState({buffer});
};// converToBuffer

  onSell = async (event) =>{
    event.preventDefault();
    var sellQ= document.getElementById("sellQ").value;
    var sellAdd = document.getElementById("sellAdd").value;
    var contractnew= new web3.eth.Contract(OldLBabi,sellAdd);
    var account= this.state.account;
    await contractnew.methods.sellDrug(sellQ).send({from:account},function(error, transactionHash){
        
        console.log(transactionHash);

        const revertmsg = async() => {
        const getRevertReason = require('eth-revert-reason');
        var y = await getRevertReason(transactionHash,'ropsten');
        console.log(y);
        if(y!= '')
        alert(document.getElementById("rvm1").innerHTML = y);
        else
          alert(document.getElementById("rvm1").innerHTML = "Drug Sold Successfully");
       };
       
       revertmsg(transactionHash);
    }
  )};
  render() {return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" id="image1"/>
        <img src={logo2} className="App-logo2" alt="logo2" id="image3" />
        <p>
          Edit <code>src/Sellers.js</code> and save to reload.
        </p>
        <a
          
        >
           Your Ethereum Address is {this.state.account}
        </a>
      </header>
      <div class="center">
      <br/>
          <form onSubmit={this.onScan}>
          <Button  bsstyle="primary" type="submit"> Scan the QR Code </Button>
          </form>
          <br/>
          <h1> { this.state.qr== true && this.state.result == '' ? <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "25%" }}
        />  : ''} </h1>
        <p>{this.state.result}</p>
        
          <form onSubmit={this.onSell}>

          <div>
           <table>
           <tr>
                   <td>Medicine EA:
                   </td>
                   <td>
                       <input type="text"  id="sellAdd"  align="left" class="mytext" value={this.state.result} onChange={this.handleChange} />
                   </td>
            </tr>

            <tr>
                   <td>Medicine Quantity:
                   </td>
                   <td>
                       <input type="text"id= "sellQ" align="left"  class="mytext"/>
                   </td>
            </tr>
               
           </table>

       </div>
        
             <Button  type="submit">  Sell Drug </Button>
          </form>
          <p id="rvm1"></p> 
          </div>

    </div>
    
  );// return
  }// render()
}// App


export default Sellers;
