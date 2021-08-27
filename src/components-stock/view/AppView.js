import React, { Component } from 'react';
import './AppView.css'
import AppViewHeader from './AppViewHeader';
//import AppViewBody from './AppViewBody';
import LandingPage from '../../components-specific/pages/LandingPage'
// eslint-disable-next-line
import {BrowserRouter as Router,Route,Link, BrowserRouter} from 'react-router-dom';
import ManageEverything from '../../components-specific/pages/ManageEverything';
import ManageCards from '../../components-specific/pages/ManageCards';

class AppView extends Component {

  render() {
    //console.log("about to render AppView.js");
    return (
      <BrowserRouter>
        <div className = "app-view">
          <AppViewHeader />
          <Route exact path="/" component={LandingPage}/>
          <Route path="/manage-characters" component={ManageEverything}/>
          <Route path="/manage-cards" component={ManageCards}/>
          <Route path="/manage-everything" component={ManageEverything}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppView;
