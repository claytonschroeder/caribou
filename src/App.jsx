import React, {Component} from 'react';

import Nodes from './components/Nodes.jsx'
import Info from './components/Info.jsx'
import Editor from './components/Editor.jsx'
import Toolbox from './components/Toolbox.jsx'

import { Grid, Col, Row } from 'react-bootstrap';

import newNodeTemplate from './lib/nodeTemplate.json'

const ObjectUtil = require('./utilities/objectCopy.js');

import store from './flux/store.js';
import actions from './flux/actions.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.store = store(this.updateNodes.bind(this));

    this.state = {
      selectedNode: null,
      editNode: null,
      shouldDisplayInfo: true,
      shouldDisplayEditor: false,
      addNodeEnabled: false,
      color: 'red',
      nodes: this.store.getState().nodes
    }

    this.actions = actions(this.store);

    this.newNode = this.newNode.bind(this);
    this.selectNode = this.selectNode.bind(this);
    this.editNode = this.editNode.bind(this);
    this.sendEdits = this.sendEdits.bind(this);
    this.updateEditState = this.updateEditState.bind(this);
    this.toggleAddNode = this.toggleAddNode.bind(this);
    this.selectColor = this.selectColor.bind(this);
  }

  updateNodes() {
    this.setState({
      nodes: this.store.getState().nodes
    })
  }

  selectColor(color){
    this.setState({
      color: color
    })
  }

  updateEditState(){
    this.setState({
      selectedNode: null,
      editNode: null,
      shouldDisplayInfo: false,
      shouldDisplayEditor: false
    })
  }

  toggleAddNode(state){
    this.setState({
      addNodeEnabled: state
    })
  }

  /* Generate a new node on the image container */
  newNode(x, y, color){
    let random = Math.random()*1000000;
    let newId = Math.round(random);
    let blankTemplate = ObjectUtil.copy(newNodeTemplate);
    let nodeArray = this.state.nodes;
    blankTemplate.id = newId;
    blankTemplate.x = x;
    blankTemplate.y = y - 10;
    blankTemplate.color = color;
    nodeArray.push(blankTemplate);
    this.setState({
      nodes: nodeArray,
      selectedNode: blankTemplate,
      editNode: null,
      shouldDisplayInfo: true
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
        editNode = { this.editNode } />
    ) : null

    nodeEdit = this.state.editNode ?  (
      <Editor
        { ...this.actions }
        node = { this.state.editNode }
        updateEditState = { this.updateEditState }
        sendEdits = { this.sendEdits } />
    ) : null



    return (
      <Grid>
        <Nodes
          addNodeEnabled = { this.state.addNodeEnabled }
          nodes = { this.state.nodes }
          selectNode = { this.selectNode }
          newNode = { this.newNode }
          color = { this.state.color }
        />
        <Row>
          <Col xs={12} md={8} style={{display: this.state.shouldDisplayInfo ? 'block' : 'none'}}>
            { nodeInfo }
          </Col>

          <Col xs={12} md={8} style={{display: this.state.shouldDisplayEditor ? 'block' : 'none'}}>
            { nodeEdit }
          </Col>

          <Col xs={12} md={8} style={{display: !this.state.shouldDisplayEditor && !this.state.shouldDisplayInfo ? 'block' : 'none'}}>
          </Col>

          <Col xs={12} md={4}>
            <Toolbox
              currentColor = { this.state.color }
              selectColor = { this.selectColor }
              toggleAddNode = { this.toggleAddNode } />
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default App;
