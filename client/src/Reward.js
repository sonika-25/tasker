import React from 'react';
import axios from 'axios';
import {getWeb3,getContracts} from "./utils.js";
import { Link } from 'react-router-dom';
import './styles/cards.css'
import './styles/grid.css'
import './styles/nav.css'
import './styles/global.css'
import Thumbnail from './Thumbnail.js'

import { withRouter } from 'react-router-dom'

class Reward extends React.Component {
	constructor(props) {
		super(props)
    this.nftId = this.nftId.bind(this);
    this.taskId = this.taskId.bind(this);
    this.transferReward = this.transferReward.bind(this);

}
	state = {
		web3: undefined,
		accounts:[],
		contracts: undefined,
    nftId:0,
    taskId:0
		}

    nftId(e){
      this.setState({
        nftId: e.target.value
      })
    }
    taskId(e){
      this.setState({
        taskId: e.target.value
      })
    }
    transferReward=async()=>{
      let u=this.state
      this.state.contracts.tasker.methods.transferRewardToOne(this.state.nftId,this.state.taskId,this.state.contracts.nft._address).send({from:this.state.accounts[0]})
			.then (data=>{
				console.log('Reward Transferred');
				let we= document.getElementById('stat')
				we.innerHTML='transferred'
			})
			console.log(await this.state.contracts.nft.methods.ownerOf(2).call({from:u.accounts[0]}));
    }
	componentWillMount() {
		const init = async () => {
			let web3 = await getWeb3();
			let contracts = await getContracts(web3);
			let accounts = await web3.eth.getAccounts();
			this.setState({
				contracts: contracts,
				accounts: accounts,
        web3:web3
			})

		}
		init();

	}


	render() {
		return (
			<>
      <nav className = "suggest">
        <a href="/" className="logo"> </a>
				<div className='profile'>
				<a href ='/teachers'>
				<button className='hmpgtext'>Homepage</button>
				</a>
				</div>
      </nav>
			<h3> Transfer Reward </h3>
	    <div className="App">
      <p className="hmpgtext">NfiId </p>
      <input onKeyUp={this.nftId} placeholder='nftId' className='button'/>
      <p className="hmpgtext">TaskId </p>
      <input onKeyUp={this.taskId} placeholder='taskId' className ="button"/>
    	</div>
			<br />
      <button onClick={this.transferReward} className="animated hmpgtext"> Transfer </button>
			<p id='stat'></p>
			</>
	  );

	}

}

export default withRouter(Reward)
