import React, { Component } from 'react';
import Card from '../cards/Card';
//import './Card.css'

class CardList extends Component {

  constructor (props) {
    super(props);
    this.handleHeaderInputChange = this.handleHeaderInputChange.bind(this);
    this.handleBodyInputChange = this.handleBodyInputChange.bind(this);
    this.handleHitTargetChange = this.handleHitTargetChange.bind(this);
    this.handleFigureChange = this.handleFigureChange.bind(this);
  }

  handleHeaderInputChange(updatedValue, id) {
    this.props.handleHeaderInputChange(updatedValue, id);
  }
  handleBodyInputChange(updatedValue, id) {
    this.props.handleBodyInputChange(updatedValue, id);
  }
  handleHitTargetChange(updatedValue, id) {
      this.props.handleHitTargetChange(updatedValue, id);
      //console.log(event);
  }
  handleFigureChange(updatedValue, id) {
    this.props.handleFigureChange(updatedValue, id);
      //console.log(event);
  }

  render() {
    return (
      <div className = "card-hand">
        {this.props.cards.map((card,cardIndex) =>(
          <Card
            card={card}
            index={cardIndex}
            key={cardIndex}
            discardFunction = {this.props.discardFunction}
            banishFunction = {this.props.banishFunction}
            isEditable = {this.props.isEditable}
            handleHeaderInputChange = {this.handleHeaderInputChange}
            handleBodyInputChange = {this.handleBodyInputChange}
            handleHitTargetChange = {this.handleHitTargetChange}
            handleFigureChange = {this.handleFigureChange}/>
        ))}
      </div>
    );
  }
}

export default CardList;
