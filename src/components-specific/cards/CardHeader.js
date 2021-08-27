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
constructor (props) {
  super(props);
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleHitTargetChange = this.handleHitTargetChange.bind(this);
  this.handleFigureChange = this.handleFigureChange.bind(this);
}

  handleInputChange(event) {
    console.log("change event to " + event.target.value);
    this.props.handleHeaderInputChange(event.target.value);
    //console.log(event);
  }
  handleHitTargetChange(updatedValue) {
      this.props.handleHitTargetChange(updatedValue);
      //console.log(event);
  }
  handleFigureChange(updatedValue) {
    this.props.handleFigureChange(updatedValue);
      //console.log(event);
  }
  render() {

    const borderStyle = {
      border: '3px solid '+this.props.themeColor
    };

    const editableHeaderLabel = (
      <input className = "card-label" defaultValue={this.props.title} onChange={this.handleInputChange} onClick={()=>{}}/>
    );

    const nonEditableHeaderLabel = (
      <div className = "card-label" onClick = {this.props.toggleFunction}>
            {this.props.title}
      </div>
    );

    return (
      <div className = "card-header" onClick = {this.props.toggleFunction}>

          {this.props.isEditable ? editableHeaderLabel : nonEditableHeaderLabel}
          {
            this.props.isExpanded
            ? null
            : <TargetNumber
              hitTarget = {this.props.hitTarget}
              borderStyle = {borderStyle}
              position = "HEADER"
              type = "NUMBER"
              isEditable = {this.props.isEditable}
              handleNumberChange = {this.handleHitTargetChange}/>
          }
          {
            this.props.isExpanded
            ? null
            : <TargetNumber
              hitTarget = {this.props.figure}
              borderStyle = {borderStyle}
              position = "HEADER"
              type = "FIGURE"
              isEditable = {this.props.isEditable}
              handleNumberChange = {this.handleFigureChange}/>
          }

      </div>
    );
  }
}

export default CardHeader;
