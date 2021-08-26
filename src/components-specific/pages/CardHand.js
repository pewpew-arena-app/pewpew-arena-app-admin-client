import React, { Component } from 'react';
//import './Card.css'
import PlayingCard from '../cards/PlayingCard'

class CardHand extends Component {
/*
  constructor (props) {
    super(props);
    this.state = {
      text: props.text
    };
  }
*/

  render() {
    return (
      <div className = "card-hand">
        {this.props.cards.map((card,cardIndex) =>(
          <PlayingCard
            card={card}
            index={cardIndex}
            key={cardIndex}
            discardFunction = {this.props.discardFunction}
            banishFunction = {this.props.banishFunction}/>
        ))}
      </div>
    );
  }
}

export default CardHand;
