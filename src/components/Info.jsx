import React, {Component} from 'react';
import { Panel, Accordion, Button } from 'react-bootstrap';

class Info extends Component {
  constructor(props) {
    super(props)
    this.deleteButton = this.deleteButton.bind(this);
  }

  deleteButton(id){
    console.log('delete in info: ', id)
    this.props.deleteThisNode(id)
  }

  render() {
    let infoStyle = {
      height: '250px',
    }

    let nodeDataInfo;

    let nodeData = this.props.nodes.map((node, i) => {
      if(node.id === parseInt(this.props.selectedId)){
        return node
      } else {
        return null
      }
    })

    if(nodeData){
      const data = nodeData[0]
      const title = <h3>{ data ? data.name : 'No name given to this node'}</h3>
      nodeDataInfo = (
        <Panel header={title} bsStyle="info">
        <Button bsStyle="danger" onClick={ () => this.deleteButton( data ? data.id : 'cant delete this node' ) } >Delete</Button>
          <Accordion>

            <Panel header="Summary" eventKey="1">
              <p>{ data ? data.notes.summary.description : 'no description given for this node'}</p>
            </Panel>

            <Panel header="Strong Evidence" eventKey="2">
              {
                data ? data.notes.strongEvidence.map((evidence, i) => {
                  return (
                    <div key={ i }>
                      <p> { evidence.detail } </p>
                      <ul>
                        {
                          evidence.references.map((reference, index) => {
                            return (
                              <li key={ index }> { reference.link } </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                }) : <p>no strong evidence given for this node</p>
              }
            </Panel>

            <Panel header="Weak/Conflicting Evidence" eventKey="3">
              {
                data ? data.notes.weakEvidence.map((evidence, i) => {
                  return (
                    <div key={ i }>
                      <p> { evidence.detail } </p>
                      <ul>
                        {
                          evidence.references.map((reference, index) => {
                            return (
                              <li key={ index }> { reference.link } </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                }) : <p>no weak or conflicting evidence given for this node</p>
              }
            </Panel>

            <Panel header="Uncertain" eventKey="4">
              {
                data ? data.notes.uncertain.map((evidence, i) => {
                  return (
                    <div key={ i }>
                      <p> { evidence.detail } </p>
                    </div>
                  )
                }) :  <p>no uncertain evidence given for this node</p>
              }
            </Panel>

          </Accordion>
        </Panel>
      )
    } else {
      nodeDataInfo = null
    }
    return (
      <div className='info-container' style={infoStyle}>
        { nodeDataInfo }
      </div>
    );
  }
}
export default Info;