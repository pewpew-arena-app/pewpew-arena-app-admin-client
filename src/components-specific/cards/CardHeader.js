import React, { Component } from 'react';
import TargetNumber from './TargetNumber';
import './Cards.css';

class CardHeader extends Component {
/*
  constructor (props) {
    super(props);
    this.state = {
      text: props.text
    };
  }
*/
  render() {

    const borderStyle = {
      border: '3px solid '+this.props.themeColor
    };

    return (
      <div className = "card-header">

          <div className = "card-label" onClick = {this.props.toggleFunction}>
            {this.props.title}
          </div>
          {
            this.props.isExpanded
            ? null
            : <TargetNumber
              hitTarget = {this.props.hitTarget}
              borderStyle = {borderStyle}
              position = "HEADER"
              type = "NUMBER"/>
          }
          <div
            className = "card-discard-icon"
            onClick = {this.props.discardFunction.bind(this,this.props.index)}></div>
          <div
            className = "card-banish-icon"
            onClick = {this.props.banishFunction.bind(this,this.props.index)}></div>

      </div>
    );
  }
}

export default CardHeader;
