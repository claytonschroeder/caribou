import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Button, FormControl } from 'react-bootstrap';

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {};

    this.saveChanges = this.saveChanges.bind(this);
  }

  saveChanges(id, description){
    this.props.saveSummaryChanges(id, description)
  }

  render(){
    const id = this.props.node.id;
    const propDescription = this.props.node.notes.summary.description;
    const stateDescription = this.state.description ? this.state.description : propDescription;
    const buttons = propDescription !== stateDescription ? (
      <Button bsStyle='success' onClick={ () => this.saveChanges(id, stateDescription) }>Save Changes</Button>
    ) : (
      null
    )
    return (
      <form>
        <FormControl
          componentClass="textarea"
          placeholder="Enter a summary"
          ref="summary"
          onChange={ (event) => this.setState({description: event.currentTarget.value}) }
          defaultValue={ propDescription ? propDescription : '' } />

          { buttons }

      </form>
    )
  }
}

export default Summary;