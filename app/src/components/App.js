import { Component } from "react";
import RouteList from "../routes/routes";

class App extends Component {
	render() {
		return (
			<div>
				<RouteList/>
				<Main/>
			</div>
		);
	}
}

export default App;
