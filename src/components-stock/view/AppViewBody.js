import React, { Component } from 'react';
import './AppView.css'
import InfoTab from '../content/InfoTab.js'
import ContentTab from '../content/ContentTab.js'

class AppViewBody extends Component {
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
      <div className = "app-view-body">
        <InfoTab text={this.props.infoText}/>
        <ContentTab />
      </div>
    );
  }
}

export default AppViewBody;
