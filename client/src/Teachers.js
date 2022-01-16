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
//assign Tasks, View Assignes Tasks, Give Rewards
class Teacher extends React.Component {
	constructor(props) {
		super(props)
}
	state = {
		web3: undefined,
		accounts:[],
		contracts: undefined,
		taskArray:[],
		NftArray:undefined
	}

	assignTask=async(e)=>{

	}

	componentWillMount() {
		const init = async () => {
			let web3 = await getWeb3();
			let contracts = await getContracts(web3);
			let accounts = await web3.eth.getAccounts();

		  //await contracts.nft.methods.createToken("https://dbdzm869oupei.cloudfront.net/img/sticker/preview/25099.png").send({from:accounts[0]})
			//await contracts.tasker.methods.assignTaskToOne("Task 3","Math",23231114,accounts[0],"additional info link",2).send({from:accounts[0]})

			this.setState({
				contracts: contracts,
				accounts: accounts,
        web3: web3
			})

		}
		init();

	}


	render() {
		return (
			<>
	    <div className="App">
			<nav className = "suggest">
				<a href="/" className="logo"> </a>
			</nav>
        <button className ="animated">
        <a href ='/teachers/assign' className="hmpgtext" style={{ textDecoration: 'none' }}> Assign Task </a>
        </button>
				<p> </p>
        <button className ="animated">
        <a href ='/teachers/viewAssigned' className="hmpgtext" style={{ textDecoration: 'none' }}> View Tasks </a>
        </button>
				<p> </p>
        <button className ="animated">
        <a href ='/teachers/reward' className="hmpgtext" style={{ textDecoration: 'none' }}> Reward</a>
        </button>
    	</div>

			</>
	  );

	}

}

export default withRouter(Teacher)
