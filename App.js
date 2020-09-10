import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import logo2 from './logo2.svg';
import App1 from './App1.js';
import App2 from './App2.js';
import LotBatch from './LotBatch.js';
import FDA from './FDA.js';
import Patients from './Patients.js';
import Sellers from './Sellers.js';
import Reseller from './Reseller.js';
import Manufacturers from './Manufacturers.js';
import CA from './CA.js';
import web3 from './web3';
import { Button } from 'reactstrap'; 
import Navigation from './Navigation.js';

class App extends Component {
state={
    account: '',
    type:'',
  }
   componentDidMount = async (event) => {
  const accounts = await web3.eth.getAccounts();
   this.setState({account:accounts[0]});

};
renderRedirect = () => {
    
      return <Redirect to={"./" + this.state.type}/>
    
  };

  onType = async (event) =>{
    event.preventDefault();
    this.setState({type : document.getElementById("type").value});
  };
  render() {
    return (      
       <BrowserRouter>
        <div>
         <form onSubmit={this.onType}>
            Type: <input type = "text" id="type"/>
             <Button  type="submit">  Submit </Button>
          </form>
        {this.state.type != null ? this.renderRedirect() : ''}

          <Navigation />
            <Switch>
             <Route path="/App1" component={App1}/>
             <Route path="/App2" component={App2}/>
             <Route path="/LotBatch" component={LotBatch}/>
             <Route path="/FDA" component={FDA}/>
             <Route path="/Manufacturers" component={Manufacturers}/>
             <Route path="/Sellers" component={Sellers}/>
            <Route path="/CA" component={CA}/>
             <Route path="/Reseller" component={Reseller}/>
             <Route path="/Patients" component={Patients}/>
              <header className="App-header">
       <img src={logo} className="App-logo" alt="logo" id="image1" />
       <img src={logo2} className="App-logo2" alt="logo2" id="image3" />
        <p>
                 <code> Welcome to the future Pharmacy </code> 
                
        </p>
        <a

        >
         Your Ethereum Address is {this.state.account} 

                </a>
      </header>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
 export default App;