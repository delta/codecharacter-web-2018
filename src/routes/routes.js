import React                  from 'react';
import { Switch, Route }      from 'react-router-dom';
import LoginContainer         from '../containers/LoginContainer';
import SignUpContainer        from '../containers/SignUpContainer';
import DashboardContainer     from '../containers/DashboardContainer';
import LeaderBoardContainer   from '../containers/LeaderBoardContainer';

export const RouteList = () => (
		<Switch>
			<Route exact path='/dashboard' component={DashboardContainer} />
      <Route exact path='/login' component={LoginContainer} />
      <Route exact path='/signup' component={SignUpContainer} />
      <Route exact path='/leaderboard' component={LeaderBoardContainer} />
		</Switch>
);
