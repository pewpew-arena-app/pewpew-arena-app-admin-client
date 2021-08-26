import React, { Component } from 'react';
import './Content.css'

class InfoTab extends Component {

  render() {
    return (
      <div className = "info-tab">
        {this.props.text}
      </div>
    );
  }
}

export default InfoTab;
