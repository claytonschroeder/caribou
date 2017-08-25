import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Panel, Button, Tabs, Tab, FormGroup, ControlLabel, FormControl, Radio, FieldGroup } from 'react-bootstrap';

import Summary from './editorComponents/Summary.jsx'
import Uncertain from './editorComponents/Uncertain.jsx'
import Size from './editorComponents/Size.jsx'
import Color from './editorComponents/Color.jsx'

import FileBase64 from 'react-file-base64';

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 1,
      evidenceIndex: null,
      referenceIndex: null,
      currentId: null
    }
    this.saveChanges = this.saveChanges.bind(this);
    this.updateName = this.updateName.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.addNew = this.addNew.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setSize = this.setSize.bind(this);
    this.addNewReference = this.addNewReference.bind(this);
    this.uploadAttachment = this.uploadAttachment.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.removeAttachment = this.removeAttachment.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.saveSummaryChanges = this.saveSummaryChanges.bind(this);
    this.saveUncertain = this.saveUncertain.bind(this);
  }

  saveAttachment(node, i, index, file){
    this.props.uploadAttachment(file, i, index, node.id, this.state.activeTab)
  }

  uploadAttachment(file){
    this.props.uploadAttachment(file, this.state.evidenceIndex, this.state.referenceIndex, this.state.currentId, this.state.activeTab)
  }

  getLocation(i, index, id){
    this.setState({
      evidenceIndex: i,
      referenceIndex: index,
      currentId: id
    })
  }

  removeAttachment(i, index, id){
    this.props.removeAttachment(i, index, id, this.state.activeTab)
  }

  removeLink(i, index, id, ref){
    this.props.removeLink(i, index, id, this.state.activeTab);
    if(ref){
      this.setState({[ref]: ""})
    }
  }

  setColor(color, id){
    this.props.changeColor(id, color.currentTarget.value)
  }

  setSize(size, id){
    this.props.changeSize(id, size.currentTarget.value)
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

  addNewReference(node, i){
    switch(this.state.activeTab){
      case 2:
        this.props.addNewStrongReference(node.id, i)
      break;
      case 3:
        this.props.addNewWeakReference(node.id, i)
      break;
    }
  }

  saveChanges(node, ref){
    switch(this.state.activeTab){
      case 1:
        this.saveSummaryChanges(node)
      break;
      case 2:
        this.saveStrongEvidence(node, ref ? ref : null)
      break;
      case 3:
        this.saveWeakEvidence(node, ref ? ref : null)
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

  saveSummaryChanges(id, description) {
    this.props.updateSummary(id, { description: description });
  }

  saveStrongEvidence(node, ref) {
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
        copyNode.notes.strongEvidence[evIndex].references[refIndex].link = ref === linkRef ? this.state[ref] : findDOMNode(this.refs[linkRef]).value
        referenceArray.push(copyNode.notes.strongEvidence[evIndex].references[refIndex])
      }
      evidence.push(copyNode.notes.strongEvidence[evIndex])
      evidence[evIndex].references = referenceArray;
    }
    this.props.updateStrongEvidence(copyNode.id, evidence);
  }

  saveWeakEvidence(node, ref) {
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
        copyNode.notes.weakEvidence[evIndex].references[refIndex].link = ref === linkRef ? this.state[ref] : findDOMNode(this.refs[linkRef]).value
        referenceArray.push(copyNode.notes.weakEvidence[evIndex].references[refIndex])
      }
      evidence.push(copyNode.notes.weakEvidence[evIndex])
      evidence[evIndex].references = referenceArray;
    }
    this.props.updateWeakEvidence(copyNode.id, evidence);
  }

  saveUncertain(node, content, i) {
    node.notes.uncertain[i].detail = content
    this.props.updateUncertainEvidence(node.id, node.notes.uncertain);
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
          <Tabs defaultActiveKey={ this.props.currentTab } onSelect={ key => this.setState({activeTab: key}, this.props.updateTab(key)) } id="uncontrolled-tab-example">



            {
              /* view in editorComponents/Summary.jsx */
            }
            <Tab eventKey={1} title="Summary">
              <Summary
                node={ node }
                saveSummaryChanges={ this.saveSummaryChanges } />
            </Tab>


            {
              /* Move to own component */
            }
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
                                <FormGroup
                                  controlId="strongEvidenceReferenceText"
                                  onClick={ () => this.getLocation(i, index, node.id) }>
                                  {
                                    reference.link ? (
                                      <div className='attached-link'>
                                        <FormControl
                                          type="text"
                                          placeholder="Enter your reference link"
                                          ref={ `strong-link-${i}-${index}` }
                                          onChange= { () => this.saveChanges(node) }
                                          value={ reference.link } />
                                        <Button onClick={ () => this.removeLink(i, index, node.id, `strong-link-${i}-${index}`) }bsStyle="danger">Remove Link</Button>
                                      </div>
                                    ) : (
                                      <div className='attached-link'>
                                        <FormControl
                                          type="text"
                                          placeholder="Enter your reference link"
                                          ref={ `strong-link-${i}-${index}` }
                                          onChange={ (event) => this.setState({[`strong-link-${i}-${index}`]: event.currentTarget.value}) }
                                          value={ this.state[`strong-link-${i}-${index}`] ? this.state[`strong-link-${i}-${index}`] : '' } />
                                        <Button onClick={ () => this.saveChanges(node, `strong-link-${i}-${index}`) }bsStyle="success">Save Link</Button>
                                      </div>
                                    )
                                  }

                                  {
                                    reference.attachment ? (
                                      <div className='attached-file'>
                                        <div disabled className='attached-file-name form-control'> { reference.fileName } </div>
                                        <Button onClick={ () => this.removeAttachment(i, index, node.id) }bsStyle="danger">Remove Attachment</Button>
                                      </div>
                                    ) : (
                                      <FormGroup className='upload-attachment'>
                                        <FormControl
                                          id="formControlsFile"
                                          type="file"
                                          label="File"
                                          onChange={ (event) => this.saveAttachment(node, i, index, event.currentTarget.files) }
                                        />
                                      </FormGroup>
                                    )
                                  }
                                </FormGroup>
                              </form>
                            )
                          })
                        }
                      <Button id="add-reference-button" bsStyle="success" onClick={ () => this.addNewReference(node, i) } >Add New Reference</Button>
                      </ul>
                    </div>
                  )
                })
              }
            </Tab>

            {
              /* Move to own component */
            }
            <Tab eventKey={3} title="Weak/Conflicting Evidence">
              {
                node.notes.weakEvidence.map((evidence, i) => {
                  return (
                    <div key={ i }>
                      <form>
                        <FormGroup controlId="weakEvidenceTextarea">
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
                                <FormGroup
                                  controlId="weakEvidenceReferenceText"
                                  onClick={ () => this.getLocation(i, index, node.id) }>
                                  {
                                    reference.link ? (
                                      <div className='attached-link'>
                                        <FormControl
                                          type="text"
                                          placeholder="Enter your reference link"
                                          ref={ `weak-link-${i}-${index}` }
                                          onChange= { () => this.saveChanges(node) }
                                          value={ reference.link } />
                                        <Button onClick={ () => this.removeLink(i, index, node.id, `weak-link-${i}-${index}`) }bsStyle="danger">Remove Link</Button>
                                      </div>
                                    ) : (
                                      <div className='attached-link'>
                                        <FormControl
                                          type="text"
                                          placeholder="Enter your reference link"
                                          ref={ `weak-link-${i}-${index}` }
                                          onChange={ (event) => this.setState({[`weak-link-${i}-${index}`]: event.currentTarget.value}) }
                                          value={ this.state[`weak-link-${i}-${index}`] ? this.state[`weak-link-${i}-${index}`] : '' } />
                                        <Button onClick={ () => this.saveChanges(node, `weak-link-${i}-${index}`) }bsStyle="success">Save Link</Button>
                                      </div>
                                    )
                                  }

                                  {
                                    reference.attachment ? (
                                      <div className='attached-file'>
                                        <div disabled className='attached-file-name form-control'> { reference.fileName } </div>
                                        <Button onClick={ () => this.removeAttachment(i, index, node.id) }bsStyle="danger">Remove Attachement</Button>
                                      </div>
                                    ) : (
                                      <FormGroup className='upload-attachment'>
                                        <FormControl
                                          id="formControlsFile"
                                          type="file"
                                          label="File"
                                          onChange={ (event) => this.saveAttachment(node, i, index, event.currentTarget.files) }
                                        />
                                      </FormGroup>
                                    )
                                  }
                                </FormGroup>
                              </form>
                            )
                          })
                        }
                      <Button id="add-reference-button" bsStyle="success" onClick={ () => this.addNewReference(node, i) } >Add New Reference</Button>
                      </ul>
                    </div>
                  )
                })
              }
            </Tab>




            {
              /* View Uncertain component in ./editorComponents/Uncertain.jsx */
            }
            <Tab eventKey={4} title="Uncertain">
              {
                node.notes.uncertain.map((evidence, i) => {
                  return (
                    <Uncertain
                      key={ i }
                      i={ i }
                      node={ node }
                      evidence={ evidence }
                      saveUncertain={ this.saveUncertain }/>
                  )
                })
              }
            </Tab>

            {
              /* View Color component in ./editorComponents/Color.jsx */
            }
            <Tab eventKey={5} title="Color">
              <Color
                node={ node }
                setColor={ this.setColor }/>
            </Tab>

            {
              /* View Size component in ./editorComponents/Size.jsx */
            }
            <Tab eventKey={6} title="Size">
              <Size
                node={ node }
                setSize={ this.setSize }/>
            </Tab>

          </Tabs>
          {
            this.state.activeTab === 2 || this.state.activeTab === 3 || this.state.activeTab === 4 ? (
              <Button id="add-button" bsStyle="success" onClick={ () => this.addNew(node) } >Add New Evidence</Button>
            ) : (
              null
            )
          }
          <Button id="delete-button" bsStyle="danger" onClick={ () => this.deleteNode(node) } >Delete Node</Button>
          <Button id="delete-button" onClick={ () => this.props.closeEditor(node) } >Close</Button>
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