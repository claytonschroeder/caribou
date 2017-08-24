import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { FormControl, FormGroup } from 'react-bootstrap';

class Uncertain extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }


  render(){
    const node = this.props.node;
    const evidence = this.props.evidence;
    const i = this.props.i
    const ref = `uncertain-${i}`
    return (
      <form key={ i }>
        <FormGroup controlId="strongEvidenceTextarea">
          <FormControl
            componentClass="textarea"
            placeholder="Enter your evidence"
            ref={ ref }
            onChange= { (event) => this.props.saveUncertain(node, event.currentTarget.value, i) }
            defaultValue={ evidence.detail ? evidence.detail : '' } />
        </FormGroup>
      </form>
    )
  }
}

export default Uncertain