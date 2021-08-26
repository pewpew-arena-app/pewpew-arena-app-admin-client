import React, { Component } from 'react';
import './CoolButton.css';
import CoolButton from './CoolButton';

class CoolButtonSet extends Component {

  render() {

    return (
      <div className = "cool-button-set">
        <CoolButton
          onClick={this.props.leftButtonHandler}
          buttonText = {this.props.leftButtonText}
          iconObj = {this.props.leftButtonIcon}
          position = "LEFT"
          disabled = {this.props.leftButtonDisabled}
        />
        <CoolButton
          onClick={this.props.rightButtonHandler}
          buttonText = {this.props.rightButtonText}
          iconObj = {this.props.rightButtonIcon}
          position = "RIGHT"
          disabled = {this.props.rightButtonDisabled}
        />
      </div>
    );
  }
}

export default CoolButtonSet;
