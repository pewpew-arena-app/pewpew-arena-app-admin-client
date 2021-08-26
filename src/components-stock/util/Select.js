import React, { Component } from 'react';
import './Select.css'

class Select extends Component {

  // Expected props:
  // - selected: string, currently selected option
  // - options: array, all possible options
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
      console.log("A handler was passed from above, using it.");
      this.props.changeHandler(event);
  }

  render() {
    return (
      <div >
        <select value={this.props.selected.id} onChange={this.handleChange}>
        {this.props.options.map(
          (optionItem) => (
            <option key={optionItem.id} value={optionItem.id}>{optionItem.name ? optionItem.name : optionItem.id}</option>
          )
        )}
        </select>
      </div>
    );
  }
}

export default Select;
