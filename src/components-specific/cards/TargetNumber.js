import React, { Component } from 'react';
import './Cards.css'

class TargetNumber extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("Target number change to " + event.target.value);
    this.props.handleNumberChange(event.target.value);
  }


  render() {
    let outerClassName = "";
    let innerClassName = "";
    let targetNumberLabel = "";
    if(this.props.position==="HEADER") {
      if(this.props.type=="FIGURE") {
        outerClassName = "card-figure-container-header";
        innerClassName = "card-target card-figure-header";
      }
      else {
        outerClassName = "card-target-container-header";
        innerClassName = "card-target card-target-header";
      }
    }
    else if(this.props.position==="BODY-RIGHT") {
      outerClassName = "card-target-container-body-right";
      innerClassName = "card-target card-target-body-right";
    }
    else if(this.props.position==="BODY-LEFT") {
      outerClassName = "card-target-container-body-left";
      innerClassName = "card-target card-target-body-left";
    }


    if(this.props.type=="NUMBER") {
      targetNumberLabel = this.props.hitTarget;
    }
    else {
      let length = this.props.hitTarget;
      Array.from({length}).forEach((v, i) => {targetNumberLabel+="I"})
    }

    const editableLabel = (
      <input className = {innerClassName} style = {this.props.borderStyle} value={this.props.hitTarget} onChange={this.handleChange} onClick={(event)=>{event.stopPropagation()}}/>
    );
    const nonEditableLabel = (
      <div className = {innerClassName} style = {this.props.borderStyle}>
        {targetNumberLabel}
      </div>
    );

    return (
      <div className = {outerClassName}>
        {this.props.isEditable ? editableLabel : nonEditableLabel}
      </div>
    );
  }
}

export default TargetNumber;
