import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AllNFTs from './AllNFTs'
import Teacher from './Teachers'
import Assign from './AssignTask'
import Reward from './Reward'
import View from './view'
import Homepage from './homepage'


class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/teachers/reward" component={Reward} />
					<Route path="/teachers/assign" component={Assign} />
					<Route path="/teachers/viewAssigned" component={View} />
					<Route path="/teachers" component={Teacher} />
					<Route path="/students" component={AllNFTs} />
					<Route path="/" component={Homepage} />


				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;
