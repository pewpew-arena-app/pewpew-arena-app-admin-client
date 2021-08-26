import React, { Component } from 'react';
import '../../components-stock/view/AppView.css'; //TODO: regroup
import '../../components-stock/content/Content.css';
import InfoTab from '../../components-stock/content/InfoTab.js';
import CardHand from './CardHand';
import MiddleButton from '../../components-stock/util/MiddleButton'
//import getGameRulesResponse from '../../resources/json/get-game-rules-response.json';
//import getCardsResponse from '../../resources/json/get-deck-response.json';
import ENDPOINTS from '../../resources/json/endpoints.json';

//TODO: replace info panel with better info panel

class PlayPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      trash: [],
      exile: [],
      hand: [],
      infoText: "Pesca utilizzando il pulsante DRAW",
      actionHistory : []
    };
    this.draw = this.draw.bind(this);
    this.discard = this.discard.bind(this);
    this.banish = this.banish.bind(this);
    this.undo = this.undo.bind(this);
  }

  componentDidMount () {
    console.log("Component mounted, fetching rules...");
    fetch(ENDPOINTS.GAME_RULES)
    .then(res => res.json())
    .then((getGameRulesResponse) => {
      this.setState({
        gameRules: getGameRulesResponse.gameRules
      });
      console.log("Rules fetched, fetching cards now...");
      fetch(ENDPOINTS.CARDS)
      .then(res => res.json())
      .then((getCardsResponse) => {
        this.setState({
          deck: this.shuffle(this.buildDeck(getCardsResponse.cards))
        })
      })
      .catch(console.log);
    })
    .catch(console.log);

  }

  buildDeck (cards) {
    var deck = [];
    var selectedCharacters = [
      this.props.location.state.currentSelect1,
      this.props.location.state.currentSelect2,
      this.props.location.state.currentSelect3
    ];
    selectedCharacters.forEach(character => {
      for(var i=0;i<this.state.gameRules.find(rule => rule.ruleKey=="N_CARDS_PER_RANK_III").ruleValue;i++)
        deck.push(cards.find(card => card.characterClass==character.type && card.rank==3));
      for(var j=0;j<this.state.gameRules.find(rule => rule.ruleKey=="N_CARDS_PER_RANK_II").ruleValue;j++)
        deck.push(cards.find(card => card.characterClass==character.type && card.rank==2));
      for(var k=0;k<this.state.gameRules.find(rule => rule.ruleKey=="N_CARDS_PER_RANK_I").ruleValue;k++)
        deck.push(cards.find(card => card.characterClass==character.type && card.rank==1));
    });

    return deck;
  }

  shuffle (deck) {

    var shuffledDeck = [];
    while(deck.length>0) {
      var randomIndex = Math.floor((Math.random()*deck.length));
      shuffledDeck.push(deck[randomIndex]);
      deck.splice(randomIndex,1);
    }

    return shuffledDeck;
  }

  draw (savedCards) {

    savedCards = this.state.hand.length;
    var currentHand = this.state.hand;
    var currentDeck = this.state.deck;
    var currentTrash = this.state.trash;
    var drawAction = [];
    var newHistoryBit = {};
    while(
      currentHand.length !== 4
      && currentDeck.length > 0
    ) {
      drawAction.push("DRAW");
      currentHand.push(currentDeck[0]);
      currentDeck.splice(0,1);
    }

    if(currentHand.length < 4) {
      if(currentTrash.length >= (4-currentHand.length)) {
        console.log("Not enough cards, but I can shuffle the trash and draw from it");
        var shuffledTrash = this.shuffle(currentTrash);
        currentDeck = shuffledTrash;

        while(currentHand.length<4) {
          drawAction.push("DRAW");
          currentHand.push(currentDeck[0]);
          currentDeck.splice(0,1);
        }

        newHistoryBit =
          {
            "actions" : drawAction
          };
          let newTrash = [];
        let currentHistory = this.state.actionHistory;
        currentHistory.push(newHistoryBit);
        console.log("After drawing: HAND:\n"+JSON.stringify(currentHand,null,4)
        +"\nDECK:\n"+JSON.stringify(currentDeck,null,4)
        +"\nTRASH:\n"+JSON.stringify(newTrash,null,4));
        this.setState(
          {
            "deck":currentDeck,
            "hand":currentHand,
            "actionHistory":currentHistory,
            "trash":newTrash
          },
          this.updateInfo()
        );

      }
      else {
        console.log("Not enough cards, and I can't draw enough from the trash (there are "+currentTrash.length+" cards there)");
        alert("YOU LOSE KEK");
        return;
      }
    }
    else {
      console.log("After drawing: "+currentHand.length+" cards in hand, "+currentDeck.length+" cards in the deck");
      newHistoryBit =
        {
          "actions" : drawAction
        };
      let currentHistory = this.state.actionHistory;
      currentHistory.push(newHistoryBit);
      this.setState(
        {
          "deck":currentDeck,
          "hand":currentHand,
          "actionHistory":currentHistory
        },
        this.updateInfo()
      );
    }


  }

  discard (index) {
    var currentHand = this.state.hand;
    var currentTrash = this.state.trash;
    var currentHistory = this.state.actionHistory;
    var discardedCard = currentHand[index];
    console.log("discarded card: "+discardedCard.title);
    currentHistory.push(
      {
        "actions" : ["DISCARD"]
      }
    );
    currentTrash.push(discardedCard);
    currentHand.splice(index,1);
    this.setState(
      {
      "hand":currentHand,
      "trash":currentTrash,
      "actionHistory":currentHistory
      },
    this.updateInfo()
  );
  }

  banish (index) {
    var currentHand = this.state.hand;
    var currentExile = this.state.exile;
    var currentHistory = this.state.actionHistory;
    var exiledCard = currentHand[index];
    console.log("exiled card: "+exiledCard.title);
    currentHistory.push(
      {
        "actions" : ["BANISH"]
      }
    );
    currentExile.push(exiledCard);
    currentHand.splice(index,1);
    this.setState(
      {
      "hand":currentHand,
      "exile":currentExile,
      "actionHistory":currentHistory
      },
    this.updateInfo()
  );
  }

  updateInfo () {
    console.log("STATE:\n"+JSON.stringify(this.state,null,4));
    var nCardsInDeck = this.state.deck.length;
    var nCardsInTrash = this.state.trash.length;
    var nCardsInExile = this.state.exile.length;
    var nCardsInHand = this.state.hand.length;

    var text =
    nCardsInDeck+" carte nel mazzo, "+
    nCardsInTrash+" carte scartate, "+
    nCardsInExile+" carte esiliate, "+
    nCardsInHand+" carte in mano.";

    this.setState({
      "infoText" : text
    });
  }

  undo () {
    if (this.state.actionHistory.length > 0) {
      var currentDeck = this.state.deck;
      var currentHand = this.state.hand;
      var currentTrash = this.state.trash;
      var currentExile = this.state.exile;
      var currentHistory = this.state.actionHistory;
      var lastIndex = (this.state.actionHistory.length-1);

      if (this.state.actionHistory[lastIndex].actions[0] === "DRAW") {
        console.log("UNDOING \"DRAW\"");

        var actionlist = this.state.actionHistory[lastIndex].actions;

        actionlist.forEach(
          function (index,item) {
            currentDeck.push(currentHand[0]);
            currentHand.splice(0,1);
          }
        );
        currentHistory.splice(lastIndex,1);

        this.setState({
          "hand" : currentHand,
          "deck" : currentDeck,
          "actionHistory" : currentHistory
        });
      }
      else if (this.state.actionHistory[lastIndex].actions[0] === "DISCARD") {
        console.log("UNDOING \"DISCARD\"");
        currentHand.push(currentTrash[currentTrash.length-1]);
        currentTrash.splice(currentTrash.length-1,1);
        currentHistory.splice(lastIndex,1);

        this.setState({
          "hand" : currentHand,
          "trash" : currentTrash,
          "actionHistory" : currentHistory
        });
      }
      else if (this.state.actionHistory[lastIndex].actions[0] === "BANISH") {
        console.log("UNDOING \"BANISH\"");

        currentHand.push(currentExile[currentExile.length-1]);
        currentExile.splice(currentExile.length-1,1);
        currentHistory.splice(lastIndex,1);

        this.setState({
          "hand" : currentHand,
          "exile" : currentExile,
          "actionHistory" : currentHistory
        });
      }
    }
    else {
      console.log("NOTHING TO UNDO")
    }
  }

  render() {

    const isHistoryAvailable = (this.state.actionHistory.length>0);
    if(this.state.deck && this.state.deck.length>0) {
      return (
        <div className = "app-view-body">
          <InfoTab text={this.state.infoText}/>
          <MiddleButton
            onclick = {this.draw}
            buttonText = "DRAW"
            theme = "BLACK"/>
            <MiddleButton
              onclick = {this.undo}
              buttonText = "UNDO"
              isDisabled = {!isHistoryAvailable}
              theme = "WHITE"/>
  
          <CardHand
            cards = {this.state.hand}
            discardFunction = {this.discard}
            banishFunction = {this.banish}/>
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

export default PlayPage;
