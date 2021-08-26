import React, { Component } from 'react';
import './CoolButton.css';
// eslint-disable-next-line
//import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import { Link } from 'react-router-dom';

class CoolButton extends Component {

  render() {
    return (
      <div className = "middle-button button-black">
        <Link className = "extended-link" to={this.props.to}>
          {this.props.buttonText}
        </Link>
      </div>
    );
  }
}

export default CoolButton;
