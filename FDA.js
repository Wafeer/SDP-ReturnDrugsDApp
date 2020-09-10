import React, { Component } from 'react';
import logo from './logo.svg';
import logo2 from './logo2.svg';
import './App.css';
import web3 from './web3';
import { Button } from 'reactstrap';
import IPFS from './ipfs';
import RSabi from "./RSabi";
class FDA extends Component {
  state={
    buffer:'',
    ipfsHash:null,
    myContract: null,
    account: '',
    contractadd:'',
    foo: false
  }

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
  componentDidMount = async (event) => {
    console.log('componentDidMount() lifecycle');
    this.setState({ foo: !this.state.foo });
    //event.preventDefault();
    //bring in user's metamask account address
    console.log('trying to connect to metamask');
    const accounts = await web3.eth.getAccounts();
    var ipfshash= '';
   for await (const result of IPFS.add(this.state.buffer)) {
      console.log(result)
      console.log(JSON.stringify(result));
      if (result.hasOwnProperty("path")){
        console.log(result.path);  
        ipfshash= result.path;
        this.setState({ipfsHash:result.path});
    }
  }
    console.log('Sending from Metamask account: ' + accounts[0]);
    this.setState({account:accounts[0]});
    var abi = RSabi;
  var bin= '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506107c3806100606000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80630177b056146100465780632d5d33571461008a578063b2e2b483146100ce575b600080fd5b6100886004803603602081101561005c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101f1565b005b6100cc600480360360208110156100a057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506103cc565b005b6101ef600480360360e08110156100e457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561012157600080fd5b82018360208201111561013357600080fd5b8035906020019184600183028401116401000000008311171561015557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929080359060200190929190803590602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061058b565b005b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f53656e646572206e6f7420617574686f72697a65642e0000000000000000000081525060200191505060405180910390fd5b600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615610372576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f526573656c6c65722065786973747320616c726561647900000000000000000081525060200191505060405180910390fd5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461048d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f53656e646572206e6f7420617574686f72697a65642e0000000000000000000081525060200191505060405180910390fd5b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615610530576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602381526020018061076b6023913960400191505060405180910390fd5b6001600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661064a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f53656e646572206e6f7420617574686f72697a65642e0000000000000000000081525060200191505060405180910390fd5b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610709576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f526573656c6c6572206e6f7420617070726f766564000000000000000000000081525060200191505060405180910390fd5b6001600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050505050505056fe43657274696669636174696f6e204167656e63792065786973747320616c7265616479a2646970667358221220c4b13acca678baa95fbd13d70a9f47d98b21b51efe717ada4cb18185b50455ef64736f6c634300060c0033';
    var address = '0x2B81ca4a41Ee04123b33A2662fd36e153C7aA775';
    var ReturnSummarynew= new web3.eth.Contract(abi,address);
    this.setState({contractadd : address});

  //here
  this.setState({myContract:ReturnSummarynew});
    }; //onSubmit
  onRs = async (event) =>{
  
    event.preventDefault();
    var rn= document.getElementById("ResellerName").value;
    var contractnew= this.state.myContract;
    var account= this.state.account;
  
    await contractnew.methods.regiterReseller(rn).send({from:account}, function(error, transactionHash){
        
        console.log(transactionHash);
        const revertmsg = async() => {
        const getRevertReason = require('eth-revert-reason');
        var y = await getRevertReason(transactionHash,'ropsten');
        console.log(y);
        if(y!= '')
        alert(document.getElementById("rvm1").innerHTML = y);
        else
          alert(document.getElementById("rvm1").innerHTML = "Reseller Registered Successfully");
        
       };
       
       revertmsg(transactionHash);
    }
    //console.log(reciept);

  )};
   onCA = async (event) =>{
    event.preventDefault();
    var can= document.getElementById("CAName").value;
    var contractnew= this.state.myContract;
    var account= this.state.account;
    await contractnew.methods.regiterCA(can).send({from:account},function(error, transactionHash){  
        console.log(transactionHash);
        const revertmsg = async() => {
        const getRevertReason = require('eth-revert-reason');
        var y = await getRevertReason(transactionHash,'ropsten');
        console.log(y);
         if(y!= '')
        alert(document.getElementById("rvm2").innerHTML = y);
        else
          alert(document.getElementById("rvm2").innerHTML = "Certification Agency Registered Successfully");
        
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
          Edit <code>src/FDA.js</code> and save to reload.
        </p>
        <a

        >
          Your Ethereum Address is {this.state.account}
        </a>
      </header>
      <div class="center">
      <br/>
          <form onSubmit={this.onRs}>
            <input type = "text" id="ResellerName" class="mytext"/>
             <Button  type="submit">  Register Reseller </Button>
          </form>
          <p id="rvm1"></p> 
          <form onSubmit={this.onCA}>
            <input type = "text" id="CAName" class="mytext" />
             <Button  type="submit">  Register CA </Button>
          </form>
          <p id="rvm2"></p> 

          </div>

    </div>
    
  );// return
  }// render()
}// App
export default FDA;

       