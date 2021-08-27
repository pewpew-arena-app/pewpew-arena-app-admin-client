import React, { Component } from 'react';
import './Page.css'

class ManageEverything extends Component {

  render() {
    const verticallyCentered = {"lineHeight" : "70vh"};
    return (
      <div className = "page">
        <div style={verticallyCentered}>
          Nella vita non si può gestire tutto.
        </div>
      </div>
    );
  }
}

export default ManageEverything;
