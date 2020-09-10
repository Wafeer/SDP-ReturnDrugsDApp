import React, { Component } from 'react';
import logo from './logo.svg';
import logo2 from './logo2.svg';
import './App.css';
import web3 from './web3';
import { Button } from 'reactstrap';
import IPFS from './ipfs';
import ReactDOM from "react-dom";
import RDPabi from './RPabi.json';
import LotBatchABI from './LBabi.json'
import QrCode from 'react.qrcode.generator'
import QrReader from "react-qr-reader";
import Timeline from 'react-time-line'

//var qcode = "Hello world";
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buffer:'',
      ipfsHash:null,
      myContract: null,
      account: '',
      contractadd:'',
      qr: false,
      delay: 300,
      result: '',
      timeevents:[]
    };
    this.handleScan = this.handleScan.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount = async (event) => {
    // const accounts = await web3.eth.getAccounts();
    //  this.setState({account:accounts[0]});
  };
  handleScan(data) {
    if (data) {
      this.setState({
        result: data
      });
    }
  }
  handleError(err) {
    console.error(err);
  }
  handleChange(event) {
    this.setState({result: event.target.value});
  }
  onScan = async(event) => {
    event.preventDefault();
    if(this.state.qr === false)
     this.setState({qr:true});
    else 
    this.setState({qr:false});
 };
  onHistory = async (event) =>{
    event.preventDefault();
    var eventarray=[] // collects all events
    var RDPadrs= document.getElementById("resellQ").value;
    var RDPcontract= new web3.eth.Contract(RDPabi, RDPadrs);
    var account= this.state.account;
    var LotBatchContractADRS='';
    var LotBatchManDate;
    await RDPcontract.methods.getDetails().call(function(err, details){
      console.log(details);
      LotBatchContractADRS=details[6];
      LotBatchManDate = new Date(details[1]*1000);
      var Expirydate = new Date(details[2]*1000); 
      document.getElementById('information').innerText= 'Medicine Details: '
      document.getElementById('MedicineName').innerText= 'Medicine Name: '
      document.getElementById('MDate').innerText= 'Manufacturing Date:'
      document.getElementById('EDate').innerText= 'Expiration Date:'
      document.getElementById('Quantity').innerText= 'Quantity'
      document.getElementById('Price').innerText= 'Price'
      document.getElementById('ResellerEA').innerText= 'ResellerEA:'
      document.getElementById('LotEA').innerText= 'LotEA:'

      document.getElementById('MedicinInfo0').innerText= details[0];
      document.getElementById('MedicinInfo1').innerText= LotBatchManDate;
      document.getElementById('MedicinInfo2').innerText= Expirydate;
      var i=3;
      for(i; i<7; i++){
        document.getElementById('MedicinInfo'+[i]).innerText= details[i];
      }
      //document.getElementById('medicineInfo').innerHTML = "Medicine Name: "+details[0]+"<br>"+ "Manufacturing Date: "+LotBatchManDate+"<br>"+"Expiry Date: "+Expirydate+"<br>"+"Quantity: "+details[3]+"<br>"+"Price: "+details[4]+"<br>"+"Reseller: "+details[5]+"<br>"+"Lot Batch: "+details[6];
      document.getElementById("Medimage").src="https://gateway.ipfs.io/ipfs/"+details.IPFS;
    });
    
    //LotBatchContract = new web3.eth.Contract(LotBatchABI, details[6]);
       //Manudate.toDateString().substring(0,15) to stringify the date and time
    await RDPcontract.getPastEvents('allevents', {fromBlock: 0, toBlock:'latest'},function (error, events){
      console.log(events);
      events.forEach(myfunction);
      document.getElementById('History').innerText= 'Drug History:';
      function myfunction(item, index){
        if(item.event ==="ReturnedDrugApproved"){
          var temptime= new Date(item.returnValues.time*1000);
          var eventformat= {ts: temptime.toISOString(), text: item.event+": " +item.returnValues.DrugName +" has been approved"};
          eventarray.push(eventformat);
         // document.getElementById("ReturnedDrugApproved").innerHTML += item.event+": " +item.returnValues.DrugName +" has been approved at "+temptime+ "<br>";
        }
        else if(item.event ==="OwnerChanged"){
          var temptime= new Date(item.returnValues.time*1000);
          var eventformat= {ts: temptime.toISOString(), text: item.event+": to " +item.returnValues.OwnerType};
          eventarray.push(eventformat);
        //  this.setState({this.state.timeevents.concat(eventformat)})
         // document.getElementById("OwnerChangedRDP").innerHTML += item.event+": to " +item.returnValues.OwnerType +" at "+temptime + "<br>";
        }
        else if(item.event ==="DrugResold"){
          var temptime= new Date(item.returnValues.time*1000);
          var eventformat= {ts: temptime.toISOString(), text: item.event+": Box Number " +item.returnValues.boxNumber};
          eventarray.push(eventformat);
          //document.getElementById("DrugResold").innerHTML += item.event+": Box Number " +item.returnValues.boxNumber +" at "+temptime + "<br>";

      }
    }
    });
    var  LotBatchContract = new web3.eth.Contract(LotBatchABI,LotBatchContractADRS);
    await LotBatchContract.getPastEvents('allevents', {fromBlock: 0, toBlock:'latest'},function (error, events){
      console.log(events);
      events.forEach(myfunction);
      //document.getElementById('LotHistory').innerText= 'Lot History:';
      function myfunction(item, index){
        if(item.event ==="LotDispatched"){
          var eventformat= {ts: LotBatchManDate.toISOString(), text: item.event+": " +item.returnValues.DrugName +" has been dispatched"};
          eventarray.push(eventformat);
          var temptime= new Date(item.returnValues.time*1000);
          //document.getElementById("LotDispatched").innerHTML += item.event+": " +item.returnValues.DrugName +" has been dispatched ";
        }
        else if(item.event ==="OwnerChanged"){
          var temptime= new Date(item.returnValues.time*1000);
          var eventformat= {ts: temptime.toISOString(), text: item.event+": to " +item.returnValues.OwnerType};
          eventarray.push(eventformat);
         // document.getElementById("OwnerChangedLOT").innerHTML += item.event+": to " +item.returnValues.OwnerType +" at "+temptime + "<br>";

        }
        else if(item.event ==="DrugSold"){
          var temptime= new Date(item.returnValues.time*1000);
          var eventformat= {ts: temptime.toISOString(), text: item.event+": box number " +item.returnValues.boxNumber};
          eventarray.push(eventformat);
         // document.getElementById("DrugSold").innerHTML += item.event+": box number " +item.returnValues.boxNumber +" at "+temptime + "<br>";

        }
      }

    });
   console.log(eventarray);
   this.setState({ timeevents: eventarray });
   this.setState({ timeevents: eventarray });

   console.log({timeevents:eventarray});

  };
  render() {
    const events=[]
    return (
   
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" id="image1"/>
        <img src={logo2} className="App-logo2" alt="logo2" id="image3" />
        <p>
          Edit <code>src/Patients.js</code> and save to reload.
        </p>
      </header>
      <div class= "center">
      <form onSubmit={this.onScan}>
          <Button  bsstyle="primary" type="submit"> Read QR Code </Button>
          </form>
          {/* <h1>{ this.state.g == true ? <QrCode value={this.state.qr} QrCode size = {'400'}/> : '' } </h1> */}
          <h1> { this.state.qr=== true && this.state.result === '' ? <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "25%" }}
        />  : ''} </h1>
        <p>{this.state.result}</p>
          <form onSubmit={this.onHistory}>
            <input type = "text" id="resellQ"  class="mytext" value={this.state.result} onChange={this.handleChange} />
             <Button  type="submit">  View History </Button>
             
          </form>
         
          <table style={{ width: "70%", textAlign: "left"}}>
          <tr>
    <th id='MedicineName'></th>
    <td id='MedicinInfo0'></td> 
  </tr>
  <tr>
    <th id='MDate'></th>
    <td id='MedicinInfo1'></td> 
  </tr>
  <tr>
  <th id='EDate'></th>
    <td id='MedicinInfo2'></td> 
  </tr>
  <tr>
  <th id='Quantity'></th>
    <td id='MedicinInfo3'></td> 
  </tr>
  <tr>
  <th id='Price'></th>
    <td id='MedicinInfo4'></td> 
  </tr>
  <tr>
  <th id='ResellerEA'></th>
    <td id='MedicinInfo5'></td> 
  </tr>
  <tr>
  <th id='LotEA'></th>
    <td id='MedicinInfo6'></td> 
  </tr>
</table>
        <h2 id="information"></h2>
          <p id="medicineInfo"></p>
          <img src='' id="Medimage"></img>
          <h2 id="History"></h2>
          <Timeline items={this.state.timeevents} />

    </div>
    </div>
  );// return
  }// render()

}// App

export default App;
