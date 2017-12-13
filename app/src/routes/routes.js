import React                  from 'react';
import { Switch, Route }      from 'react-router-dom';
import LoginContainer         from '../containers/LoginContainer';

export const RouteList = () => (
		<Switch>
			<Route exact path='/' component={LoginContainer} />
		</Switch>
);
