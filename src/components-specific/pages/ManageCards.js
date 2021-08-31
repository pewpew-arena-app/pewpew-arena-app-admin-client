import React, { Component } from 'react';
import '../../components-stock/view/AppView.css'; //TODO: regroup
import '../../components-stock/content/Content.css';
import InfoTab from '../../components-stock/content/InfoTab.js';
import CardList from './CardList';
import MiddleButton from '../../components-stock/util/MiddleButton'
//import getGameRulesResponse from '../../resources/json/get-game-rules-response.json';
//import getCardsResponse from '../../resources/json/get-deck-response.json';
import ENDPOINTS from '../../resources/json/endpoints.json';

//TODO: replace info panel with better info panel

class ManageCards extends Component {

  constructor (props) {
    super(props);
    this.state = {
      queryParams : new URLSearchParams(this.props.location.search),
      isEditModeEnabled : false
    };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.abort = this.abort.bind(this);
    this.handleHeaderInputChange = this.handleHeaderInputChange.bind(this);
    this.handleBodyInputChange = this.handleBodyInputChange.bind(this);
    this.handleHitTargetChange = this.handleHitTargetChange.bind(this);
    this.handleFigureChange = this.handleFigureChange.bind(this);
  }

  buildGetCardsUrl(gameVersion) {
    return ENDPOINTS.CARDS + "?gameVersion="+gameVersion;
  }

  fetchCards() {
    fetch(this.buildGetCardsUrl(this.state.queryParams.get("currentlySelectedVersion")))
    .then(res => res.json())
    .then((getCardsResponse) => {
      this.setState({
        cards: getCardsResponse.cards
      });
      console.log("...done");
    })
    .catch(console.log);
  }

  componentDidMount () {
    console.log("Component mounted, fetching cards...");
    this.fetchCards();
  }

  edit() {
    console.log("Edit, sure");
    let currentCards = this.state.cards;
    this.setState({
      isEditModeEnabled : true,
      updatedCards : currentCards
    });
  }

  abort() {
    this.setState({
      isEditModeEnabled : false
    });
  }

  save() {
    console.log("Save, sure");
    console.dir(this.state.updatedCards);
    fetch(ENDPOINTS.CARDS,{method : "PUT", headers : {'Content-Type': 'application/json'}, body : JSON.stringify({cards : this.state.updatedCards})}) //body mate
    .then(res => res.json())
    .then((putCardsResponse) => {
      this.setState({
        cards: putCardsResponse.cards
      });
      console.log("...done putting");
      this.setState({
        isEditModeEnabled : false
      });
    })
    .catch(console.log);
  }

  handleHeaderInputChange(updatedValue, id) {
    console.log("Updating the header of card " + id + " to '"+updatedValue+"'");
    let currentUpdatedCards = this.state.updatedCards;
    currentUpdatedCards[currentUpdatedCards.findIndex(card => card.abilityId==id)].title = updatedValue;
    this.setState({
      updatedCards : currentUpdatedCards
    });
  }
  handleBodyInputChange(updatedValue, id) {
    console.log("Updating the body of card " + id + " to '"+updatedValue+"'");
    let currentUpdatedCards = this.state.updatedCards;
    currentUpdatedCards[currentUpdatedCards.findIndex(card => card.abilityId==id)].body = updatedValue;
    this.setState({
      updatedCards : currentUpdatedCards
    });
  }
  handleHitTargetChange(updatedValue, id) {
    console.log("Updating the hit target of card " + id + " to '"+updatedValue+"'");
    let currentUpdatedCards = this.state.updatedCards;
    currentUpdatedCards[currentUpdatedCards.findIndex(card => card.abilityId==id)].hitTarget = updatedValue;
    this.setState({
      updatedCards : currentUpdatedCards
    });
  }
  handleFigureChange(updatedValue, id) {
    console.log("Updating the figure/rank of card " + id + " to '"+updatedValue+"'");
    let currentUpdatedCards = this.state.updatedCards;
    currentUpdatedCards[currentUpdatedCards.findIndex(card => card.abilityId==id)].rank = updatedValue;
    this.setState({
      updatedCards : currentUpdatedCards
    });
  }

  render() {
    const infoMessage = "Tutte le carte di tutti i personaggi, versione "+this.state.queryParams.get("currentlySelectedVersion");
    if(this.state.cards && this.state.cards.length>0) {
      return (
        <div className = "app-view-body">
          <InfoTab text={infoMessage}/>
          <MiddleButton
            onclick = {this.edit}
            buttonText = "EDIT"
            theme = "BLACK"
            isHidden = {this.state.isEditModeEnabled}/>
          <MiddleButton
              onclick = {this.abort}
              buttonText = "ABORT"
              theme = "WHITE"
              isHidden = {!this.state.isEditModeEnabled}/>
          <MiddleButton
            onclick = {this.save}
            buttonText = "SAVE"
            theme = "BLACK"
            isHidden = {!this.state.isEditModeEnabled}/>
  
          <CardList
            cards = {this.state.cards}
            discardFunction = {()=>{}}
            banishFunction = {()=>{}}
            isEditable = {this.state.isEditModeEnabled}
            handleHeaderInputChange = {this.handleHeaderInputChange}
            handleBodyInputChange = {this.handleBodyInputChange}
            handleHitTargetChange = {this.handleHitTargetChange}
            handleFigureChange = {this.handleFigureChange}/>
        </div>
      );
    }
    else {
      return(
        <div className = "app-view-body">Loading sorry</div>
      );
    }
  }
}

export default ManageCards;
