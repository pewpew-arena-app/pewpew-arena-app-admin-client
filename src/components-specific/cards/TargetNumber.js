import React, { Component } from 'react';
import './Cards.css'

class TargetNumber extends Component {



  render() {
    let outerClassName = "";
    let innerClassName = "";
    let targetNumberLabel = "";
    if(this.props.position==="HEADER") {
      outerClassName = "card-target-container-header";
      innerClassName = "card-target card-target-header";
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
    return (
      <div className = {outerClassName}>
        <div className = {innerClassName} style = {this.props.borderStyle}>
          {targetNumberLabel}
        </div>
      </div>
    );
  }
}

export default TargetNumber;
