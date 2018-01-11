import React                  from 'react';
import { Switch, Route }      from 'react-router-dom';
import LoginContainer         from '../containers/LoginContainer';
import SignUpContainer        from '../containers/SignUpContainer';
import DashboardContainer     from '../containers/DashboardContainer';
import LeaderBoardContainer   from '../containers/LeaderBoardContainer';
import MatchViewContainer     from '../containers/MatchesViewContainer';
import ProfileContainer       from '../containers/ProfileContainer';
import NavbarContainer        from '../containers/NavbarContainer';
import RulesComponent from '../components/RulesComponent';

export const RouteList = () => (
  <div>
    <NavbarContainer/>
    <Switch>
      <Route exact path='/profile' component={ProfileContainer}/>
      <Route exact path='/dashboard' component={DashboardContainer}/>
      <Route exact path='/login' component={LoginContainer} />
      <Route exact path='/signup' component={SignUpContainer} />
      <Route exact path='/leaderboard' component={LeaderBoardContainer} />
      <Route exact path='/matches' component={MatchViewContainer}/>
      <Route exact path='/rules' component={RulesComponent}/>
    </Switch>
  </div>
);
