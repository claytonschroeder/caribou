import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Panel, Button, Tabs, Tab, FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 1,
    }
    this.saveChanges = this.saveChanges.bind(this);
    this.updateName = this.updateName.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.addNew = this.addNew.bind(this);
    this.setColor = this.setColor.bind(this);

  }

  setColor(color, id){
    this.props.changeColor(id, color.currentTarget.value)
  }

  addNew(node){
    switch(this.state.activeTab){
      case 2:
        this.props.addNewStrongEvidence(node.id);
      break;
      case 3:
        this.props.addNewWeakEvidence(node.id);
      break;
      case 4:
        this.props.addNewUncertainEvidence(node.id);
      break;
    }
  }

  saveChanges(node){
    switch(this.state.activeTab){
      case 1:
        this.saveSummaryChanges(node)
      break;
      case 2:
        this.saveStrongEvidence(node)
      break;
      case 3:
        this.saveWeakEvidence(node)
      break;
      case 4:
        this.saveUncertain(node)
      break;
    }
  }

  deleteNode(node){
    this.props.deleteNode(node.id)
    this.props.updateEditState()
  }

  updateName(node){
    this.props.updateName(node.id, { name: findDOMNode(this.refs.name).value });
  }

  saveSummaryChanges(node) {
    this.props.updateSummary(node.id, { description: findDOMNode(this.refs.summary).value });
  }

  saveStrongEvidence(node) {
    const evidence = [];

    const evidenceLength = node.notes.strongEvidence.length

    const referencesLength = node.notes.strongEvidence

    let copyNode = node

    for(let evIndex = 0; evIndex < evidenceLength; evIndex++){
      let referenceArray = [];
      let referencesLength = node.notes.strongEvidence[evIndex].references.length
      let detailRef = `strong-${evIndex}`
      copyNode.notes.strongEvidence[evIndex].detail = findDOMNode(this.refs[detailRef]).value
      for(let refIndex = 0; refIndex < referencesLength; refIndex++){
        let linkRef = `strong-link-${evIndex}-${refIndex}`
        copyNode.notes.strongEvidence[evIndex].references[refIndex].link = findDOMNode(this.refs[linkRef]).value
        referenceArray.push(copyNode.notes.strongEvidence[evIndex].references[refIndex])
      }
      evidence.push(copyNode.notes.strongEvidence[evIndex])
      evidence[evIndex].references = referenceArray;
    }
    this.props.updateStrongEvidence(copyNode.id, evidence);
  }

  saveWeakEvidence(node) {
    const evidence = [];

    const evidenceLength = node.notes.weakEvidence.length

    const referencesLength = node.notes.weakEvidence

    let copyNode = node

    for(let evIndex = 0; evIndex < evidenceLength; evIndex++){
      let referenceArray = [];
      let referencesLength = node.notes.weakEvidence[evIndex].references.length
      let detailRef = `weak-${evIndex}`
      copyNode.notes.weakEvidence[evIndex].detail = findDOMNode(this.refs[detailRef]).value
      for(let refIndex = 0; refIndex < referencesLength; refIndex++){
        let linkRef = `weak-link-${evIndex}-${refIndex}`
        copyNode.notes.weakEvidence[evIndex].references[refIndex].link = findDOMNode(this.refs[linkRef]).value
        referenceArray.push(copyNode.notes.weakEvidence[evIndex].references[refIndex])
      }
      evidence.push(copyNode.notes.weakEvidence[evIndex])
      evidence[evIndex].references = referenceArray;
    }
    this.props.updateWeakEvidence(copyNode.id, evidence);
  }

  saveUncertain(node) {
    const evidence = [];

    const evidenceLength = node.notes.uncertain.length

    let copyNode = node;

    for(let unIndex = 0; unIndex < evidenceLength; unIndex++){
      let uncertainRef = `uncertain-${unIndex}`
      copyNode.notes.uncertain[unIndex].detail = findDOMNode(this.refs[uncertainRef]).value
      evidence.push(copyNode.notes.uncertain[unIndex])
    }
    this.props.updateUncertainEvidence(copyNode.id, evidence);
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
            defaultValue={ node.name ? node.name : '' }
            onChange= { () => this.updateName(node) } />
        </form>
      )
      editorForm = (
        <Panel id="info-panel" header={ title } bsStyle="warning">
          <Tabs defaultActiveKey={1} onSelect={ key => this.setState({activeTab: key}) } id="uncontrolled-tab-example">

            <Tab eventKey={1} title="Summary">
              <form>
                <FormControl
                  componentClass="textarea"
                  placeholder="Enter a summary"
                  ref="summary"
                  onChange= { () => this.saveChanges(node) }
                  defaultValue={ node.notes.summary.description ? node.notes.summary.description : '' } />
              </form>
            </Tab>


            <Tab eventKey={2} title="Strong Evidence">
              {
                node.notes.strongEvidence.map((evidence, i) => {
                  return (
                    <div key={ i }>
                      <form>
                        <FormGroup controlId="strongEvidenceTextarea">
                          <FormControl
                            componentClass="textarea"
                            placeholder="Enter your evidence"
                            ref={ `strong-${i}` }
                            onChange= { () => this.saveChanges(node) }
                            defaultValue={ evidence.detail ? evidence.detail : '' } />
                        </FormGroup>
                      </form>
                      <ul key={ i }>
                        {
                          evidence.references.map((reference, index) => {
                            return (
                              <form key={ index }>
                                <FormGroup controlId="strongEvidenceReferenceText">
                                  <FormControl
                                    type="text"
                                    placeholder="Enter your reference link"
                                    ref={ `strong-link-${i}-${index}` }
                                    onChange= { () => this.saveChanges(node) }
                                    defaultValue={ reference.link ? reference.link : '' } />
                                </FormGroup>
                              </form>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })
              }
            <Button id="add-button" bsStyle="success" onClick={ () => this.addNew(node) } >Add New</Button>
            </Tab>


            <Tab eventKey={3} title="Weak/Conflicting Evidence">
              {
                node.notes.weakEvidence.map((evidence, i) => {
                  return (
                    <div key={ i }>
                      <form>
                        <FormGroup controlId="strongEvidenceTextarea">
                          <FormControl
                            componentClass="textarea"
                            placeholder="Enter your evidence"
                            ref={ `weak-${i}` }
                            onChange= { () => this.saveChanges(node) }
                            defaultValue={ evidence.detail ? evidence.detail : '' } />
                        </FormGroup>
                      </form>
                      <ul key={ i }>
                        {
                          evidence.references.map((reference, index) => {
                            return (
                              <form key={ index }>
                                <FormGroup controlId="strongEvidenceReferenceText">
                                  <FormControl
                                    type="text"
                                    placeholder="Enter your reference link"
                                    ref={ `weak-link-${i}-${index}` }
                                    onChange= { () => this.saveChanges(node) }
                                    defaultValue={ reference.link ? reference.link : '' } />
                                </FormGroup>
                              </form>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })
              }
            <Button id="add-button" bsStyle="success" onClick={ () => this.addNew(node) } >Add New</Button>
            </Tab>


            <Tab eventKey={4} title="Uncertain">
              {
                node.notes.uncertain.map((evidence, i) => {
                  return (
                    <form key={ i }>
                      <FormGroup controlId="strongEvidenceTextarea">
                        <FormControl
                          componentClass="textarea"
                          placeholder="Enter your evidence"
                          ref={ `uncertain-${i}` }
                          onChange= { () => this.saveChanges(node) }
                          defaultValue={ evidence.detail ? evidence.detail : '' } />
                      </FormGroup>
                    </form>
                  )
                })
              }
            <Button id="add-button" bsStyle="success" onClick={ () => this.addNew(node) } >Add New</Button>
            </Tab>

            <Tab eventKey={5} title="Color">
              <FormGroup>
                <Radio name="colorPicker" inline value="red" defaultChecked={ node.color === 'red' ? true : false } onClick={ (color) => this.setColor(color, node.id) }>
                  Red
                </Radio>
                {'  '}
                <Radio name="colorPicker" inline value="blue" defaultChecked={ node.color === 'blue' ? true : false } onClick={ (color) => this.setColor(color, node.id) }>
                  Blue
                </Radio>
                {'  '}
                <Radio name="colorPicker" inline value="green" defaultChecked={ node.color === 'green' ? true : false } onClick={ (color) => this.setColor(color, node.id) }>
                  Green
                </Radio>
              </FormGroup>
            </Tab>

          </Tabs>
          <Button id="delete-button" bsStyle="danger" onClick={ () => this.deleteNode(node) } >Delete</Button>
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