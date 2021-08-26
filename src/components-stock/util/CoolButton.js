import React, { Component } from 'react';
import './CoolButton.css';
import '../../components-specific/pages/Page.css';

class CoolButton extends Component {

  render() {

    /*
    const iconStyle = {
      "backgroundImage" : 'url('+this.props.iconObj+')'
    };
    */
    const buttonClass = "cool-button-with-icon"
    + (
      this.props.position === "CENTERED"
      ? " cool-button-centered"
      : ""
    ) + (
      this.props.position === "LEFT"
      ? " cool-button-left"
      : ""
    ) + (
      this.props.position === "RIGHT"
      ? " cool-button-right"
      : ""
    ) + (
      this.props.disabled
      ? " cool-button-disabled"
      : ""
    );

    const iconClass = "cool-button-icon "+(
      this.props.purpose === "DRAW"
      ? "draw-icon"
      : "undo-icon"
    );

    return (
      <div>
      {
        (
          this.props.iconObj
          ? (
            <div
              className = {buttonClass}
              onClick = {
                this.props.disabled
                ? null
                : this.props.onClick
              }>
              {this.props.buttonText}
              <div className = {iconClass}>
              </div>
            </div>
          )
          : (
            <div
              className = {buttonClass}
              onClick = {
                this.props.disabled
                ? null
                : this.props.onClick
              }>
              {this.props.buttonText}
            </div>
          )
        )
      }
      </div>
    );
  }
}

export default CoolButton;
