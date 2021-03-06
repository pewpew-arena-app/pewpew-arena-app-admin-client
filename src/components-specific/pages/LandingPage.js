import React, { Component } from 'react';
import './Page.css'
import InfoTab from '../../components-stock/content/InfoTab.js'
import Select from '../../components-stock/util/Select'
import CoolLink from '../../components-stock/util/CoolLink'
import AppData from '../../resources/json/app-data.json'

import ENDPOINTS from '../../resources/json/endpoints.json'

//this still makes sense, it's the version of the client side app
const appVersion = AppData.appVersionMajor+"."+AppData.appVersionMinor;

class LandingPage extends Component {

  constructor (props) {
    super(props);
    this.state = {};
    this.versionChangeHandler = this.versionChangeHandler.bind(this);
  }

  componentDidMount() {
    console.log("Component did mount, fetching versions now");
    fetch(ENDPOINTS.VERSIONS)
    .then(res => res.json())
    .then((getVersionsResponse) => {
      if(getVersionsResponse.gameVersions && getVersionsResponse.gameVersions.length>0) {
        this.setState({
          availableVersions: getVersionsResponse.gameVersions,
          currentlySelectedVersion: getVersionsResponse.gameVersions[0].id
        })
      }
      else {
        console.error("No versions no party, hombre");
      }
    })
    .catch(console.log);
  }

  versionChangeHandler(event) {
    console.log("You changed the version, big man --> " + event.target.value);
    this.setState({currentlySelectedVersion : event.target.value});
  }

  render() {
    //console.log("about to render LandingPage.js");
    const infoText = "Deck Manager Admin versione "+appVersion;
    const alignLeft = {align : "left"};
    if(this.state.availableVersions) {
      console.log("About to render with version " + this.state.currentlySelectedVersion);
      const queryParamsToNextPage = "?currentlySelectedVersion="+this.state.currentlySelectedVersion+"&versions="+JSON.stringify(this.state.availableVersions);
      return (
        <div className = "page">
          <InfoTab text={infoText}/>
          <label>Seleziona una versione da gestire</label>
          <Select
            options={this.state.availableVersions}
            changeHandler = {this.versionChangeHandler}
            selected={this.state.currentlySelectedVersion}/>
          <CoolLink to={{pathname : "/manage-characters", search : queryParamsToNextPage}} buttonText = "GESTISCI PERSONAGGI"/>
          <CoolLink to={{pathname : "/manage-cards",  search : queryParamsToNextPage}} buttonText = "GESTISCI CARTE"/>
          <CoolLink to="/manage-everything" buttonText = "GESTISCI TUTTO"/>
          <label>Oppure</label>
          <CoolLink to={{pathname : "/generate-new-version", search : queryParamsToNextPage}} buttonText = "CREA NUOVA VERSIONE"/>
        </div>
      );
    }
    else {
      return (
        <div className = "page">
          Yeah well I'm loading
        </div>
      );
    }
  }
}

export default LandingPage;
