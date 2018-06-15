import React                  from 'react';
import { Switch, Route, Redirect }      from 'react-router-dom';
import LoginContainer         from '../containers/LoginContainer';
import SignUpContainer        from '../containers/SignUpContainer';
import DashboardContainer     from '../containers/DashboardContainer';
import LeaderBoardContainer   from '../containers/LeaderBoardContainer';
import MatchViewContainer     from '../containers/MatchesViewContainer';
import ProfileContainer       from '../containers/ProfileContainer';
import GlobalContainer        from '../containers/GloabalContainer';
import DocsComponent         from '../components/DocsComponent';
import ProfileViewContainer   from '../containers/ProfileViewContainer';
import WelcomeScreenComponent from '../components/WelcomeScreenComponent';
import NotificationTableContainer from '../containers/NotificationsTableContainer';
import NotFoundComponent from '../components/NotFoundComponent';

export const RouteList = () => (
  <div>
    <GlobalContainer/>
    <Switch>
      <Route exact path='/' component={WelcomeScreenComponent}/>
      <Route exact path='/profile' component={ProfileContainer}/>
      <Route exact path='/dashboard' component={DashboardContainer}/>
      <Route exact path='/login' component={LoginContainer} />
      <Route exact path='/signup' component={SignUpContainer} />
      <Route exact path='/leaderboard' render={() => (<Redirect to="/leaderboard/1"/>)}/>
      <Route exact path='/leaderboard/:page' component={LeaderBoardContainer} />
      <Route exact path='/matches' component={MatchViewContainer}/>
      <Route exact path='/matches/:matchId' component={MatchViewContainer}/>
      <Route exact path='/docs' component={DocsComponent}/>
      <Route exact path='/notifications' component={NotificationTableContainer}/>
      <Route exact path='/:name' component={ProfileViewContainer}/>
      <Route component={NotFoundComponent} />
    </Switch>
  </div>
);
