import React, { Component } from 'react';
import ENDPOINTS from '../../resources/json/endpoints.json';
import Select from '../../components-stock/util/Select';
// eslint-disable-next-line
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import CoolLink from '../../components-stock/util/CoolLink'

class CharacterSelector extends Component {

  //TODO: number of selectable characters should depend on a parameter as well lol
  constructor (props) {
    super(props);
    this.state = {};
/*     characterList: getCharactersResponse.characters,
      currentSelect1: getCharactersResponse.characters[0],
      currentSelect2: getCharactersResponse.characters[1],
      currentSelect3: getCharactersResponse.characters[2]
    }; */
    this.changeHandler1 = this.changeHandler1.bind(this);
    this.changeHandler2 = this.changeHandler2.bind(this);
    this.changeHandler3 = this.changeHandler3.bind(this);
  }

  componentDidMount () {
    console.log("Component mounted, fetching characters...");
    fetch(ENDPOINTS.CHARACTERS)
    .then(res => res.json())
    .then((getCharactersResponse) => {
      this.setState({
        characterList: getCharactersResponse.characters,
        currentSelect1: getCharactersResponse.characters[0],
        currentSelect2: getCharactersResponse.characters[1],
        currentSelect3: getCharactersResponse.characters[2]
      })
    })
    .catch(console.log);
  }

  changeHandler1 (e) {
    console.log("changing currentSelect1 to "+e.target.value);
    this.setState(
      {
        "currentSelect1" : this.state.characterList.find(character => parseInt(character.id, 10)===parseInt(e.target.value, 10))
      }
    );
  }

  changeHandler2 (e) {
    console.log("changing currentSelect2 to "+e.target.value);
    this.setState(
      {
        "currentSelect2" : this.state.characterList.find(character => parseInt(character.id, 10)===parseInt(e.target.value, 10))
      }
    );
  }

  changeHandler3 (e) {
    console.log("changing currentSelect3 to "+JSON.stringify(e.target.value));
    this.setState(
      {
        "currentSelect3" : this.state.characterList.find(character => parseInt(character.id, 10)===parseInt(e.target.value, 10))
      }
    );
  }

  render() {
    if(this.state.characterList) {
      return (
        <div className = "content-tab">
          <Select
          options={this.state.characterList}
          changeHandler = {this.changeHandler1}
          selected = {this.state.currentSelect1}/>
          <Select
          options={this.state.characterList}
          changeHandler = {this.changeHandler2}
          selected = {this.state.currentSelect2}/>
          <Select
          options={this.state.characterList}
          changeHandler = {this.changeHandler3}
          selected = {this.state.currentSelect3}/>
          <CoolLink
            buttonText="START GAME"
            to= {
              {
                "pathname" : "/play",
                "state" : this.state
              }
            }
            optStyle = {
              {
                "fontSize" : "13px"
              }
            }/>
        </div>
      );
    }
    else {
      return (
        <div>Loading sorry</div>
      );
    }
  }
}

export default CharacterSelector;
