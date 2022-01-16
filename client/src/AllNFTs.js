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

class AllNFTs extends React.Component {
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

	report=async(e)=>{
		let task = await this.state.contracts.tasker.methods.taskList(e.target.value).call({from:this.state.accounts[0]});
		let add = task.to
		await this.state.contracts.tasker.methods.reportStatus((e.target.value-1),add).send({from:this.state.accounts[0]})

	}

	componentWillMount() {
		const init = async () => {
			let web3 = await getWeb3();
			let contracts = await getContracts(web3);
			let accounts = await web3.eth.getAccounts();
		  //await contracts.nft.methods.createToken("https://cdna.artstation.com/p/assets/images/images/005/693/850/original/holly-turner-hermionetransparent.gif?1493066989").send({from:accounts[0]})
			//await contracts.tasker.methods.assignTaskToOne("Study the chapter: 'p-block elements'","Organic Chemistry",2531114,accounts[0],"additional info link",1).send({from:accounts[0]})
			await contracts.nft.methods.balanceOf(contracts.tasker._address).call({from:accounts[0]})
			.then(data=>{
				console.log(data);
			})
			let numTasks = await contracts.tasker.methods.taskNo().call({from:accounts[0]})
			let arrTask =[]
			for (let i =0;i<numTasks;i++){
				await contracts.tasker.methods.taskList(i).call({from:accounts[0]})
				.then (async(data)=>{
						let nfI = data.idOfReward;
						let owner =await contracts.nft.methods.ownerOf(nfI).call({from:accounts[0]})
						let rew = await contracts.nft.methods.tokenURI(nfI).call({from:accounts[0]})
						if(owner.toString() == accounts[0].toString()){
							data.rewardstat = "YES"
						}
						else{
							data.rewardstat = 'NO'
						}
						data.status=data.status.toString()
						data.reward = rew
						data.taskNumber ++
						arrTask.push(data)

				})
			}
			this.setState({
				taskArray: arrTask,
				contracts: contracts,
				accounts: accounts
			})

		}
		init();

	}


	render() {
		return (
			<>
	    <div className="App">
			<nav className = "suggest">
				<Link to="/" className="logo"> </Link>
				<div className="profile">
				</div>
			</nav>
			<h4>Jane Doe</h4>
      <table className="meta button content card link">
        <tr className ="content button meta tableRow">
					<th>Sl. No</th>
          <th>Name</th>
          <th>Topic</th>
					<th>Extra Info</th>
					<th>Assigned to</th>
					<th>Reward NFT Link </th>
					<th>Change Status</th>
					<th> Reward Won </th>

        </tr>
        {this.state.taskArray.map((val, key) => {
          return (
            <tr key={key} className = 'card link button'>
							<td className = ' link button'>{val.taskNumber}</td>
              <td className = ' link button'>{val.desc}</td>
              <td className = ' link button'>{val.topic}</td>
							<td className = ' link button'>
									<a href={val.info} target="_blank">additional info</a>
							</td>
							<td className = ' link button'>{val.to}</td>
							<td className = ' link button'>
							    <a href={val.reward} target="_blank">NFT LINK</a>
							</td>
							<td className = ' link button'>
								<button onClick={this.report} value={val.taskNumber}>{val.status}</button>
							</td>
							<td className = ' link button'>{val.rewardstat}</td>
            </tr>
          )
        })}
      </table>
    	</div>

			</>
	  );

	}

}

export default withRouter(AllNFTs)
