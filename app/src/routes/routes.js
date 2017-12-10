import React from "react";
import { Switch, Route } from "react-router-dom";

export const RouteList = () => (
	<Routes>
		<Switch>
			<Route exact path='/' component={Home} />
		  <Route path='/leaderboard' component={Leaderboard} />
			<Route path='/dashboard' component={DashBoard} />
		</Switch>
	</Routes>
);
