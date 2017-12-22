import React, { Component } from "react";
import {RouteList} from "../routes/routes";

class App extends Component {
	render() {
		return (
			<div className='routeWrapper'>
				<RouteList/>
			</div>
		);
	}
}

export default App;
