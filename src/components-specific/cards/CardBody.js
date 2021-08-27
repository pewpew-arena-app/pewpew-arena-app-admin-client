import React, { Component } from 'react';
import './Cards.css';
import TargetNumber from './TargetNumber';

class CardBody extends Component {
  constructor (props) {
    super(props);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleHitTargetChange = this.handleHitTargetChange.bind(this);
    this.handleFigureChange = this.handleFigureChange.bind(this);
  }
  
  handleBodyChange(event) {
      console.log("change event to " + event.target.value);
      this.props.handleBodyInputChange(event.target.value);
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

    const editableBodyText = (
      <textarea className = "card-body-text" value={this.props.description} onChange={this.handleBodyChange}/>
    );

    const nonEditableBodyText = (
      <div className = "card-body-text" dangerouslySetInnerHTML={{ __html: this.props.description }}/>
    );

    return (
      <div className = "card-body">
        <div className = "card-body-subheader">
          {this.props.owner}
        </div>
        {this.props.isEditable ? editableBodyText : nonEditableBodyText}
        <TargetNumber
          hitTarget = {this.props.hitTarget}
          borderStyle = {borderStyle}
          position = "BODY-RIGHT"
          type = "NUMBER"
          isEditable = {this.props.isEditable}
          handleNumberChange = {this.handleHitTargetChange}/>
        <TargetNumber
          hitTarget = {this.props.figure}
          borderStyle = {borderStyle}
          position = "BODY-LEFT"
          type = "FIGURE"
          isEditable = {this.props.isEditable}
          handleNumberChange = {this.handleFigureChange}/>
      </div>
    );
  }
}

export default CardBody;
