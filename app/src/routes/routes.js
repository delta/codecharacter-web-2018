import React                  from 'react';
import { Switch, Route }      from 'react-router-dom';
import LoginContainer         from '../containers/LoginContainer';
import SignUpContainer        from '../containers/SignUpContainer';

export const RouteList = () => (
		<Switch>
			<Route exact path='/' component={LoginContainer} />
      <Route exact path='/signup' component={SignUpContainer} />
		</Switch>
);
