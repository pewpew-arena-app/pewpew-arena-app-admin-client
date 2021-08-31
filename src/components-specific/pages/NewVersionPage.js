import React, { Component } from 'react';
import './Page.css'
import InfoTab from '../../components-stock/content/InfoTab.js'
import Select from '../../components-stock/util/Select'
import MiddleButton from '../../components-stock/util/MiddleButton'
import { Redirect } from 'react-router-dom';

import ENDPOINTS from '../../resources/json/endpoints.json'

class NewVersionPage extends Component {

  constructor (props) {
    super(props);
    let versions = JSON.parse(new URLSearchParams(this.props.location.search).get("versions"));
    this.state = {
      versions : versions,
      baselineVersion : versions[0]
    };
    console.log("I made it: this.state="+JSON.stringify(this.state));
    this.baselineVersionChangeHandler = this.baselineVersionChangeHandler.bind(this);
    this.createNewVersion = this.createNewVersion.bind(this);
  }

  buildPostVersionsUrl(baselineVersion) {
    return ENDPOINTS.VERSIONS+"?baselineVersion="+baselineVersion;
  }

  createNewVersion() {
    console.log("Creating new version");
    fetch(this.buildPostVersionsUrl(this.state.baselineVersion.id),{method : "POST", headers : {'Content-Type': 'application/json'}, body : JSON.stringify({})}) //body mate
    .then(res => res.json())
    .then((postVersionsResponse) => {
      if(postVersionsResponse && postVersionsResponse.generatedVersion) {
        let message = "Generata versione " + postVersionsResponse.generatedVersion + " a partire dalla versione di riferimento " + this.postVersionsResponse.baselineVersion;
        alert(postVersionsResponse.message);
        this.setState({
          createdVersion : postVersionsResponse.generatedVersion,
          isCreationSuccessfullyCompleted : true
        });
      }
      else {
        console.error("No versions no party, hombre");
      }
    })
    .catch(console.log);
  }

  baselineVersionChangeHandler(event) {
    console.log("You changed the baseline version, big man --> " + event.target.value);
    this.setState({baselineVersion : event.target.value});
  }

  render() {
    if(this.state.isCreationSuccessfullyCompleted) {
      return (
        <Redirect to={"/manage-cards?currentlySelectedVersion="+this.state.createdVersion} push={true} />
      );
    }
    else {
      const infoText = "Creazione di una nuova versione a partire da una versione di riferimento. La nuova versione sarà inizialmente identica a quella di riferimento, ma potrà poi essere modificata separatamente.";
      const alignLeft = {align : "left"};
      return (
        <div className = "page">
          <InfoTab text={infoText}/>
          <label>Seleziona una versione di riferimento</label>
          <Select
            options={this.state.versions}
            changeHandler = {this.baselineVersionChangeHandler}
            selected={this.state.baselineVersion}/>
            <MiddleButton
              onclick = {this.createNewVersion}
              buttonText = "GENERA NUOVA VERSIONE"
              theme = "BLACK"/>
        </div>
      );
    }
  }
}

export default NewVersionPage;
