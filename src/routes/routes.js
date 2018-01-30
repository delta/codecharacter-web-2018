import React                  from 'react';
import { Switch, Route }      from 'react-router-dom';
import LoginContainer         from '../containers/LoginContainer';
import SignUpContainer        from '../containers/SignUpContainer';
import DashboardContainer     from '../containers/DashboardContainer';
import LeaderBoardContainer   from '../containers/LeaderBoardContainer';
import MatchViewContainer     from '../containers/MatchesViewContainer';
import ProfileContainer       from '../containers/ProfileContainer';
import GlobalContainer        from '../containers/GloabalContainer';
import RulesComponent         from '../components/RulesComponent';
import ProfileViewContainer   from '../containers/ProfileViewContainer';
import WelcomeScreenComponent from '../components/WelcomeScreenComponent';
import NotificationTableContainer from '../containers/NotificationsTableContainer';
import NotFoundComponent from '../components/NotFoundComponent';

export const RouteList = () => (
  <div>
    <GlobalContainer/>
    <Switch>
      <Route exact path='/' component={WelcomeScreenComponent}/>
      <Route exact path='/myprofile' component={ProfileContainer}/>
      <Route exact path='/dashboard' component={DashboardContainer}/>
      <Route exact path='/login' component={LoginContainer} />
      <Route exact path='/signup' component={SignUpContainer} />
      <Route exact path='/leaderboard' component={LeaderBoardContainer} />
      <Route exact path='/matches' component={MatchViewContainer}/>
      <Route exact path='/rules' component={RulesComponent}/>
      <Route exact path='/notifications' component={NotificationTableContainer}/>
      <Route exact path='/:name' component={ProfileViewContainer}/>
      <Route exact path='*' component={NotFoundComponent} />
    </Switch>
  </div>
);
