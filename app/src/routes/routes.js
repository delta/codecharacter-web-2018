import React                  from 'react';
import { Switch, Route }      from 'react-router-dom';
import LoginContainer         from '../containers/loginContainer';

export const RouteList = () => (
		<Switch>
			<Route exact path='/' component={LoginContainer} />
		  <Route path='/leaderboard' component={Leaderboard} />
			<Route path='/dashboard' component={DashBoard} />
		</Switch>
);
