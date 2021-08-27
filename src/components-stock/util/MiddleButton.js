import React, { Component } from 'react';
import './CoolButton.css';

class MiddleButton extends Component {

  render() {
    if(this.props.isHidden) {
      return (<div></div>);
    }
    else {
      let className = "middle-button"+
      (
          this.props.theme === "BLACK"
          ? " button-black"
          : " button-white"
      )+
      (
        this.props.isDisabled
        ? "-disabled"
        : ""
      );
      return (
        <div className = {className} onClick = {this.props.onclick}>
          {this.props.buttonText}
        </div>
      );
    }
  }
}

export default MiddleButton;
