import React, { Component } from 'react';

import Nodes from './components/Nodes.jsx'
import Info from './components/Info.jsx'
import Editor from './components/Editor.jsx'
import Toolbox from './components/Toolbox.jsx'
import Header from './components/Header.jsx'

import { Grid, Col, Row } from 'react-bootstrap';

import store from './flux/store.js';
import actions from './flux/actions.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.store = store(this.updateNodes.bind(this));

    this.state = {
      image: 'http://localhost:8000/build/images/PallidSturgeon.png',
      selectedNode: null,
      editNode: null,
      shouldDisplayInfo: true,
      shouldDisplayEditor: false,
      addNodeEnabled: false,
      viewLegend: true,
      color: 'red',
      redSelected: true,
      blueSelected: true,
      greenSelected: true,
      initialSelected: true,
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
    this.filterNodes = this.filterNodes.bind(this);
    this.updateImageURL = this.updateImageURL.bind(this);
    this.toggleViewLegend = this.toggleViewLegend.bind(this);
    this.hideNode = this.hideNode.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage(file){
    this.setState({ image: file.base64 })
  }

  closeEditor(node){
    this.setState({
      shouldDisplayInfo: true,
      shouldDisplayEditor: false,
      editNode: null,
      selectedNode: node
    })
  }


  updateNodes() {
    this.setState({
      nodes: this.store.getState().nodes
    })
  }

  hideNode(id){
    this.actions.hideNode(id);
  }

  updateImageURL(url){
    this.setState({
      image: url
    })
  }

  filterNodes(color){
    switch(color){
      case 'red':
        this.setState({
          redSelected: !this.state.redSelected
        })
      break;
      case 'blue':
        this.setState({
          blueSelected: !this.state.blueSelected
        })
      break;
      case 'green':
        this.setState({
          greenSelected: !this.state.greenSelected
        })
      break;
      case 'initial':
        this.setState({
          initialSelected: !this.state.initialSelected
        })
      break;
    }
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

  toggleViewLegend(state){
    this.setState({
      viewLegend: state
    })
  }

  /* Generate a new node on the image container */
  newNode(x, y, color){
    this.actions.addNewNode(x, y, color);
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
        closeEditor = { this.closeEditor }
        node = { this.state.editNode }
        updateEditState = { this.updateEditState }
        sendEdits = { this.sendEdits } />
    ) : null



    return (
      <div>
        <Grid className='header-grid'>
          <Header />
        </Grid>
        <Grid>
          <Nodes
            uploadImage = { this.uploadImage }
            hideNode = { this.hideNode }
            viewLegend = { this.state.viewLegend }
            updateImageURL = { this.updateImageURL }
            image = { this.state.image }
            addNodeEnabled = { this.state.addNodeEnabled }
            nodes = { this.state.nodes }
            selectNode = { this.selectNode }
            selectedNode = { this.state.selectedNode }
            newNode = { this.newNode }
            color = { this.state.color }
            redSelected = { this.state.redSelected }
            blueSelected = { this.state.blueSelected }
            greenSelected = { this.state.greenSelected }
            initialSelected = { this.state.initialSelected } />
          <Row>
            <Col className='info-container' xs={12} md={8} style={{display: this.state.shouldDisplayInfo ? 'block' : 'none'}}>
              { nodeInfo }
            </Col>

            <Col className='editor-container' xs={12} md={8} style={{display: this.state.shouldDisplayEditor ? 'block' : 'none'}}>
              { nodeEdit }
            </Col>

            <Col className='dummy-container' xs={12} md={8} style={{display: !this.state.shouldDisplayEditor && !this.state.shouldDisplayInfo ? 'block' : 'none'}}>
            </Col>

            {
              this.state.image ? (
                <Col className='toolbox-container' xs={12} md={4}>
                  <Toolbox
                    toggleViewLegend = { this.toggleViewLegend }
                    filterNodes = { this.filterNodes }
                    currentColor = { this.state.color }
                    selectColor = { this.selectColor }
                    toggleAddNode = { this.toggleAddNode }
                    redSelected = { this.state.redSelected }
                    blueSelected = { this.state.blueSelected }
                    greenSelected = { this.state.greenSelected }
                    initialSelected = { this.state.initialSelected } />
                </Col>
              ) : null
            }
          </Row>
        </Grid>
      </div>
    );
  }
}
export default App;
