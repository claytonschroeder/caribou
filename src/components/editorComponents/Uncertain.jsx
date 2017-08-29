import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { FormControl, FormGroup, Button } from 'react-bootstrap';

class Uncertain extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  // onChange= { (event) => this.props.saveUncertain(node, event.currentTarget.value, i) }

  render(){
    const node = this.props.node;
    const evidence = this.props.evidence;
    const i = this.props.i
    const ref = `uncertain-${i}`

    const propEvidence = evidence.detail ? evidence.detail : '';
    const stateEvidence = this.state[ref] ? this.state[ref] : '';

    const saveUncertainButton = (propEvidence !== stateEvidence) && (stateEvidence !== '') ? (
      <Button id="save-button" bsStyle="success" onClick={ () => this.props.saveUncertain(node, this.state[`uncertain-${i}`], i) } >Save Changes</Button>
      ) : null;

    return (
      <form key={ i }>
        <FormGroup controlId="strongEvidenceTextarea">
          <FormControl
            componentClass="textarea"
            placeholder="Enter your evidence"
            ref={ ref }
            onChange= { (event) => this.setState({[ref]: event.currentTarget.value}) }
            defaultValue={ evidence.detail ? evidence.detail : '' } />
        </FormGroup>
        { saveUncertainButton }
      </form>
    )
  }
}

export default Uncertain