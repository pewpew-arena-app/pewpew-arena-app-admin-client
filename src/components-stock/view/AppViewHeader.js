import React, { Component } from 'react';
import './AppView.css'
import appData from '../../resources/json/app-data.json'
// eslint-disable-next-line
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

class AppViewHeader extends Component {
/*
  constructor (props) {
    super(props);
    this.state = {
      text: props.text
    };
  }
*/
  render() {
    return (
      <div className = "app-view-header">
        <Link to="/">
          {appData.gameName}
        </Link>
      </div>
    );
  }
}

export default AppViewHeader;
