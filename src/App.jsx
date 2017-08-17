import React, {Component} from 'react';

import Nodes from './components/Nodes.jsx'
import Info from './components/Info.jsx'
import Editor from './components/Editor.jsx'

import { Grid, Col, Row } from 'react-bootstrap';

import newNodeTemplate from './lib/nodeTemplate.json'

const ObjectUtil = require('./utilities/objectCopy.js');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNode: null,
      editNode: null,
      shouldDisplayInfo: true,
      shouldDisplayEditor: false,
      nodes: [
        {
          id: 12341412341,
          x: 145,
          y: 125,
          name: 'Node 1',
          notes: {
            summary: {
              id: 123411234,
              addedBy: 'Tim',
              description: 'this is an example of a summary',
              link: 'upstream water management and central platte hydrology',
              createdAt: '2017-08-03 19:58:16.145+00',
              updatedAt: '2017-08-03 19:58:16.145+00',
            },
            strongEvidence: [
              {
                detail: 'There a only 4 pallid sturgeon left in the entire world.',
                references: [
                  {
                    id: 41234112,
                    link: 'http://www.google.com',
                  },
                  {
                    id: 1234125132,
                    link: 'http://www.yahoo.com',
                  },
                  {
                    id: 1234125132,
                    link: 'http://www.cnn.com',
                  }
                ]
              },
              {
                detail: 'Pallid sturgeon can only breed on January 7 of years that are divisable by 9.',
                references: [
                  {
                    id: 41234112,
                    link: 'http://www.wikipedia.com',
                  }
                ]
              }
            ],
            weakEvidence: [
              {
                detail: 'Pallid sturgeon are thriving in some areas.',
                references: [
                  {
                    id: 131234,
                    link: 'http://www.google.ca',
                  }
                ]
              },
              {
                detail: 'Pallid sturgeon have no predators besides themselves.',
                references: [
                  {
                    id: 4992928,
                    link: 'http://www.wikipedia.com',
                  }
                ]
              }
            ],
            uncertain: [
              {
                detail: 'Pallid sturgeon can be up to 10,000 years old.'
              },
              {
                detail: 'Pallid sturgeon are dinosaurs.'
              },
              {
                detail: 'Pallid sturgeon can read the minds of fisherman.'
              }
            ]
          }
        }
      ]
    }
    this.newNode = this.newNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.selectNode = this.selectNode.bind(this);
    this.editNode = this.editNode.bind(this);
    this.sendEdits = this.sendEdits.bind(this);
  }

  /* Generate a new node on the image container */
  newNode(x, y){
    let random = Math.random()*1000000;
    let newId = Math.round(random);
    let blankTemplate = ObjectUtil.copy(newNodeTemplate);
    let nodeArray = this.state.nodes;
    blankTemplate.id = newId;
    blankTemplate.x = x;
    blankTemplate.y = y - 10;
    nodeArray.push(blankTemplate);
    this.setState({
      nodes: nodeArray,
      selectedNode: blankTemplate,
      editNode: null,
      shouldDisplayInfo: true
    })
  }

  /* Delete a node from the image container */
  deleteNode(id){
    let nodes = this.state.nodes
    let updatedNodeArray = nodes.filter((node) => {
      return node.id !== id
    })
    this.setState({
      nodes: updatedNodeArray,
      selectedNode: null,
      editNode: null
    })
  }

  /* Select the Node you want to display the edit container for */
  editNode(id){
    const editNode = this.state.nodes.filter(( node ) => {
        return node.id === parseInt(id);
    })[0];
    this.setState({
      editNode: editNode,
      selectedNode: null,
      shouldDisplayInfo: false,
      shouldDisplayEditor: true
    })
  }

  /* Select the Node you want to display info container for */
  selectNode(id){
    const selectedNode = this.state.nodes.filter(( node ) => {
        return node.id === parseInt(id);
    })[0];
    this.setState({
      selectedNode: selectedNode,
      shouldDisplayInfo: true,
      shouldDisplayEditor: false,
      editNode: null
    })
  }

  /* Update App state with changes recieved from Editor */
  sendEdits(updatedNode){
    let nodes = this.state.nodes
    let updatedNodeArray = nodes.filter((node) => {
      return node.id !== updatedNode.id
    })
    updatedNodeArray.push(updatedNode)
    this.setState({
      nodes: updatedNodeArray
    })
  }

  render() {
    let nodeInfo, nodeEdit;
    nodeInfo = this.state.selectedNode ?  (
      <Info
        node = { this.state.selectedNode }
        deleteNode = { this.deleteNode }
        editNode = { this.editNode } />
    ) : null

    nodeEdit = this.state.editNode ?  (
      <Editor
        node = { this.state.editNode }
        sendEdits = { this.sendEdits } />
    ) : null



    return (
      <Grid>
        <Nodes
          nodes = { this.state.nodes }
          selectNode = { this.selectNode }
          newNode = { this.newNode }
        />
        <Row>
          <Col xs={12} md={8} style={{display: this.state.shouldDisplayInfo ? 'block' : 'none'}}>
            { nodeInfo }
          </Col>
          <Col xs={12} md={8} style={{display: this.state.shouldDisplayEditor ? 'block' : 'none'}}>
            { nodeEdit }
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default App;
