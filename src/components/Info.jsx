import React, {Component} from 'react';
import { Panel, Button, Tabs, Tab, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Info extends Component {
  constructor(props) {
    super(props)
    this.editButton = this.editButton.bind(this);
  }

  editButton(id){
    this.props.editNode(id)
  }

  render() {

    let nodeInfo;

    const node = this.props.node

    if(node){
      nodeInfo = (
        <Panel id="info-panel" header={ node.name ? node.name : 'No Name Given' } bsStyle="primary">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">

            <Tab eventKey={1} title="Summary">
              <p>{ node.notes.summary.description ? node.notes.summary.description : 'no description given for this node'}</p>
            </Tab>

            <Tab eventKey={2} title="Strong Evidence">
              {
                node.notes.strongEvidence.map((evidence, i) => {
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
                    return null
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
                    return null
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