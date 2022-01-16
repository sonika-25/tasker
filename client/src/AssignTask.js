import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import './styles/global.css'
import {getWeb3,getContracts} from "./utils.js";

class Assign extends React.Component {
  constructor(props) {
		super(props)
    this.desc = this.desc.bind(this);
    this.topic = this.topic.bind(this);
    this.to = this.to.bind(this);
    this.info = this.info.bind(this);
    this.nftId = this.nftId.bind(this);
    this.assign = this.assign.bind(this);

  }
  state = {
    desc:'',
    topic:'',
    deadline:163234,
    to:undefined,
    info: '',
    nftId:0,
    web3:undefined,
    contracts:undefined,
    accounts: undefined
  }

  desc(e){
    this.setState({
      desc: e.target.value
    })
  }
  topic(e){
    this.setState({
      topic: e.target.value
    })
  }

  to(e){
    this.setState({
      to: e.target.value
    })
  }
  info(e){
    this.setState({
      info: e.target.value
    })
  }
  nftId(e){
    this.setState({
      nftId: e.target.value
    })
  }
 assign=async(e)=>{
   console.log(this.state);
   let u=this.state
   await this.state.contracts.tasker.methods.assignTaskToOne(u.desc,u.topic,u.deadline,u.to,u.info,u.nftId).send({from:u.accounts[0]})
   .then(data=>{
     console.log(data);
     let we= document.getElementById('stat')
     we.innerHTML='Assigned'
   })

 }
  componentWillMount(){
    const init =async()=>{
      let web3 = await getWeb3();
      let contracts = await getContracts(web3);
      let accounts = await web3.eth.getAccounts();
      this.setState({
        web3:web3,
        contracts:contracts,
        accounts:accounts
      })
    }
    init();
  }
  render() {
    return (
      <>
      <nav className = "suggest">
        <a href="/" className="logo"> </a>
        <div className="profile">
        <a href ='/teachers'>
        <button className='hmpgtext'>Homepage</button>
        </a>
        </div>
      </nav>
      <div className='grid four'>
        <p>Description : </p>
        <input onKeyUp={this.desc} placeholder='Desc'/>
        <p>Topic : </p>
        <input onKeyUp={this.topic} placeholder='Topic'/>
        <p>Deadline : </p>
        <input placeholder='Deadline'/>
        <p>Assigned To : </p>
        <input onKeyUp={this.to} placeholder='To'/>
        <p>Additional Info : </p>
        <input onKeyUp={this.info} placeholder='Info'/>
        <p>Reward NFT Id : </p>
        <input onKeyUp={this.nftId} placeholder='NftId'/>
      </div>
      <button onClick={this.assign} className="animated hmpgtext">Assign</button>
      <p id='stat' className='hmpgtext'></p>
      </>
    )
  }
}
export default Assign
