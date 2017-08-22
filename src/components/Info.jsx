import React, { Component } from 'react';
import { Panel, Button, Tabs, Tab, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Info extends Component {
  constructor(props) {
    super(props)
    this.editButton = this.editButton.bind(this);
    this.openInNewWindow = this.openInNewWindow.bind(this);
  }

  editButton(id){
    this.props.editNode(id)
  }

  openInNewWindow(file){
    let win = window.open();
    win.document.write('<iframe src="' + file + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
  }

  render() {

    let nodeInfo;

    const node = this.props.node
    const strongCount = node.notes.strongEvidence.length > 0 && node.notes.strongEvidence[0].detail ? node.notes.strongEvidence.length : 0;
    const weakCount = node.notes.weakEvidence.length > 0 && node.notes.weakEvidence[0].detail ? node.notes.weakEvidence.length : 0
    const uncertainCount = node.notes.uncertain.length > 0 && node.notes.uncertain[0].detail ? node.notes.uncertain.length : 0

    if(node){
      nodeInfo = (
        <Panel id="info-panel" header={ node.name ? node.name : 'No Name Given' } bsStyle="primary">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">

            <Tab eventKey={1} title="Summary">
              <p>{ node.notes.summary.description ? node.notes.summary.description : 'no description given for this node'}</p>
            </Tab>

            <Tab eventKey={2} title={ `Strong Evidence - (${strongCount})` }>
              {
                node.notes.strongEvidence.map((evidence, i) => {
                  if(evidence.detail){
                    return (
                      <div key={ i }>
                        <p> { evidence.detail } </p>
                        <ul>
                          {
                            evidence.references.map((reference, index) => {
                              let referenceLink = reference.link ? (
                                <li>
                                  <a target="_blank" href={ reference.link ? reference.link : null }>{ reference.link ? reference.link : null }</a>
                                </li>
                              ) : null

                              let referenceAttachment = reference.attachment ? (
                                <li>
                                  <a onClick={ () => this.openInNewWindow(reference.attachment ? reference.attachment : null) }>
                                    { reference.fileName ? reference.fileName : null }
                                  </a>
                                </li>
                              ) : null
                              return (
                                <div key={ index }>
                                  { referenceLink }
                                  { referenceAttachment }
                                </div>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  } else {
                    return null
                  }
                })
              }
            </Tab>

            <Tab eventKey={3} title={ `Weak/Conflicting Evidence - (${weakCount})` }>
              {
                node.notes.weakEvidence.map((evidence, i) => {
                  if(evidence.detail){
                    return (
                      <div key={ i }>
                        <p> { evidence.detail } </p>
                        <ul>
                          {
                            evidence.references.map((reference, index) => {
                              let referenceLink = reference.link ? (
                                <li>
                                  <a target="_blank" href={ reference.link ? reference.link : null }>{ reference.link ? reference.link : null }</a>
                                </li>
                              ) : null

                              let referenceAttachment = reference.attachment ? (
                                <li>
                                  <a onClick={ () => this.openInNewWindow(reference.attachment ? reference.attachment : null) }>
                                    { reference.fileName ? reference.fileName : null }
                                  </a>
                                </li>
                              ) : null
                              return (
                                <div key={ index }>
                                  { referenceLink }
                                  { referenceAttachment }
                                </div>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  } else {
                    return null
                  }
                })
              }
            </Tab>

            <Tab eventKey={4} title={ `Uncertain Evidence - (${uncertainCount})` }>
              {
                node.notes.uncertain.map((evidence, i) => {
                  if(evidence.detail){
                    return (
                      <div key={ i }>
                        <p> { evidence.detail } </p>
                      </div>
                    )
                  } else {
                    return null
                  }
                })
              }
            </Tab>

          </Tabs>
          <Button id="edit-button" bsStyle="info" onClick={ () => this.editButton(node.id) } >Edit</Button>
        </Panel>
      )
    } else {
      nodeInfo = null
    }
    return (
      <div className='info-container'>
        { nodeInfo }
      </div>
    );
  }
}
export default Info;