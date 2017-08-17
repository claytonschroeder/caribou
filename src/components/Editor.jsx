import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Panel, Button, Tabs, Tab, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Editor extends Component {
  constructor(props) {
    super(props)

    this.saveChanges = this.saveChanges.bind(this);

  }

  saveChanges(node){
    let newNode = node
    var newName = findDOMNode(this.refs.name).value
    var newSummary = findDOMNode(this.refs.summary).value
    newNode.name = newName;
    newNode.notes.summary.description = newSummary;
    this.props.sendEdits(newNode)
  }


  render() {

    let editorForm;

    const node = this.props.node;


    if(node){
      const title = (
        <form>
          <FormControl
            type="text"
            placeholder="Enter a name"
            ref="name"
            defaultValue={ node.name ? node.name : '' } />
        </form>
      )
      editorForm = (
        <Panel id="info-panel" header={ title } bsStyle="warning">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">

            <Tab eventKey={1} title="Summary">
              <form>
                <FormControl
                  componentClass="textarea"
                  placeholder="Enter a summary"
                  ref="summary"
                  defaultValue={ node.notes.summary.description ? node.notes.summary.description : '' } />
              </form>
            </Tab>


            <Tab eventKey={2} title="Strong Evidence">
              {
                node.notes.strongEvidence.map((evidence, i) => {
                  if(evidence.detail){
                    return (
                      <div key={ i }>
                        <form>
                          <FormGroup controlId="strongEvidenceTextarea">
                            <FormControl
                              componentClass="textarea"
                              placeholder="Enter your evidence"
                              ref="strong"
                              defaultValue={ evidence.detail ? evidence.detail : '' } />
                          </FormGroup>
                        </form>
                        <ul key={ i }>
                          {
                            evidence.references.map((reference, index) => {
                              return (
                                <Button key={ index } bsStyle="link" href={ reference.link }>{ reference.link }</Button>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  } else {
                    return <p>no strong evidence given for this node</p>
                  }
                })
              }
            </Tab>


            <Tab eventKey={3} title="Weak/Conflicting Evidence">
              {
                node.notes.weakEvidence.map((evidence, i) => {
                  if(evidence.detail){
                    return (
                      <div key={ i }>
                        <p> { evidence.detail } </p>
                        <ul>
                          {
                            evidence.references.map((reference, index) => {
                              return (
                                <Button key={ index } bsStyle="link" href={ reference.link }>{ reference.link }</Button>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  } else {
                    return <p>no weak or conflicting evidence given for this node</p>
                  }
                })
              }
            </Tab>


            <Tab eventKey={4} title="Uncertain">
              {
                node.notes.uncertain.map((evidence, i) => {
                  if(evidence.detail){
                    return (
                      <div key={ i }>
                        <p> { evidence.detail } </p>
                      </div>
                    )
                  } else {
                    return <p>no uncertain evidence given for this node</p>
                  }
                })
              }
            </Tab>
          </Tabs>
          <Button id="edit-button" bsStyle="success" onClick={ () => this.saveChanges(node) } >Save Changes</Button>
        </Panel>
      )
    } else {
      editorForm = null
    }
    return (
      <div className='editor-container'>
        { editorForm }
      </div>
    );
  }
}
export default Editor;