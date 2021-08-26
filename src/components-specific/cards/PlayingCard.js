import React, { Component } from 'react';
import './Cards.css'
import CardHeader from './CardHeader'
import CardBody from './CardBody'

class PlayingCard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      "expanded": props.expanded
    };
    this.toggle = this.toggle.bind(this);
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
          isExpanded = {this.state.expanded}/>
        {
          this.state.expanded
          ? <CardBody
              description = {this.props.card.body}
              hitTarget = {this.props.card.hitTarget}
              owner = {this.props.card.characterClassDescription}
              themeColor = {this.props.card.themeColorHex}
              figure = {this.props.card.rank}/>
          : null
        }
      </div>
    );
  }
}

export default PlayingCard;
