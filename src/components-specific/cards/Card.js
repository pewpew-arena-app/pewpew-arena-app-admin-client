import React, { Component } from 'react';
import './Cards.css'
import CardHeader from './CardHeader'
import CardBody from './CardBody'

class Card extends Component {

  constructor (props) {
    super(props);
    this.state = {
      "expanded": props.expanded
    };
    this.toggle = this.toggle.bind(this);
    this.handleHeaderInputChange = this.handleHeaderInputChange.bind(this);
    this.handleBodyInputChange = this.handleBodyInputChange.bind(this);
    this.handleHitTargetChange = this.handleHitTargetChange.bind(this);
    this.handleFigureChange = this.handleFigureChange.bind(this);
  }

  toggle() {
    if(this.state.expanded)
      this.setState({
        "expanded":false
      });
    else {
      this.setState({
        "expanded":true
      });
    }
  }

  handleHeaderInputChange(updatedValue) {
    this.props.handleHeaderInputChange(updatedValue, this.props.card.abilityId);
  }

  handleBodyInputChange(updatedValue) {
    this.props.handleBodyInputChange(updatedValue, this.props.card.abilityId);
  }
  handleHitTargetChange(updatedValue) {
      this.props.handleHitTargetChange(updatedValue, this.props.card.abilityId);
      //console.log(event);
  }
  handleFigureChange(updatedValue) {
    this.props.handleFigureChange(updatedValue, this.props.card.abilityId);
      //console.log(event);
  }

  render() {
    return (
      <div className = "card">
        <CardHeader
          title = {this.props.card.title}
          hitTarget = {this.props.card.hitTarget}
          index = {this.props.index}
          toggleFunction = {this.toggle}
          discardFunction = {this.props.discardFunction}
          banishFunction = {this.props.banishFunction}
          owner = {this.props.card.characterClassDescription}
          themeColor = {this.props.card.themeColorHex}
          isExpanded = {this.state.expanded}
          figure = {this.props.card.rank}
          isEditable = {this.props.isEditable}
          handleHeaderInputChange = {this.handleHeaderInputChange}
          handleHitTargetChange = {this.handleHitTargetChange}
          handleFigureChange = {this.handleFigureChange}/>
        {
          this.state.expanded
          ? <CardBody
              description = {this.props.card.body}
              hitTarget = {this.props.card.hitTarget}
              owner = {this.props.card.characterClassDescription}
              themeColor = {this.props.card.themeColorHex}
              figure = {this.props.card.rank}
              isEditable = {this.props.isEditable}
              handleBodyInputChange = {this.handleBodyInputChange}
              handleHitTargetChange = {this.handleHitTargetChange}
              handleFigureChange = {this.handleFigureChange}/>
          : null
        }
      </div>
    );
  }
}

export default Card;
