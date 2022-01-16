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

class Homepage extends React.Component {
	constructor(props) {
		super(props)
}
	state = {}


	componentWillMount() {}


	render() {
		return (
			<>
	    <div className="App">
  			<nav className = "suggest">
  				<Link to="/" className="logo"> </Link>
  				<div className="profile">
    				<a href="/mint" className="button">
    					<span>Mint NFT</span>
    				</a>
  					<a href="/account" className="button">
  						<span>View Owned NFTs</span>
  					</a>
  				</div>
  			</nav>
		  </div>
      <a className="header"> Choose: </a>
			<br />
      <button className="animated">
      <a href="/teachers" className='hmpgtext' style={{ textDecoration: 'none' }}> TEACHER </a>
      </button>
			<p></p>

      <button className ="animated">
      <a href="/students" className='hmpgtext' style={{ textDecoration: 'none' }}> STUDENT </a>
      </button>
			</>
	  );

	}

}

export default withRouter(Homepage)
