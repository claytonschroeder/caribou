import React, { Component } from 'react';

import Nodes from './components/Nodes.jsx'
import Info from './components/Info.jsx'
import Editor from './components/Editor.jsx'
import Toolbox from './components/Toolbox.jsx'
import Header from './components/Header.jsx'

import { Grid, Col, Row } from 'react-bootstrap';
import ReactLoading from 'react-loading';

import newNodeTemplate from './lib/nodeTemplate.json'
const ObjectUtil = require('./utilities/objectCopy.js');

import Api from './lib/api.js';

import store from './flux/store.js';
import actions from './flux/actions.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.store = store(this.updateNodes.bind(this));

    this.state = {
      loading: true,
      image: null,
      selectedNode: null,
      editNode: null,
      shouldDisplayInfo: true,
      shouldDisplayEditor: false,
      addNodeEnabled: false,
      viewLegend: true,
      color: 'red',
      size: 'm',
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
    this.selectSize = this.selectSize.bind(this);
  }

  componentDidMount(){
    Api.json('/projects').then(response => {
      this.setState({
        loading: false,
        image: response.image,
      }, this.store.updateState(response.nodes))
    })
  }

  /* If no image URL, you can upload a new image from your computer, called from Nodes component */
  uploadImage(file){
    this.setState({ image: file.base64 })
  }

  /* close the editor and re-open the info box with the same node */
  closeEditor(node){
    this.setState({
      shouldDisplayInfo: true,
      shouldDisplayEditor: false,
      editNode: null,
      selectedNode: node
    })
  }

  /* triggered by actions. anytime we edit, add or delete nodes this is called and updates the state of the node array. We also send the latest node array to our api to update the database to keep everything in sync. */
  updateNodes() {
    const nodes = this.store.getState().nodes
    Api.post('/projects/update', nodes).then(response => {
      this.setState({
        nodes: nodes
      })
    })
  }

  /* Hide and show individual nodes using checkboxed in the Legend */
  hideNode(id){
    this.actions.hideNode(id);
  }

  /* If no image URL, you can upload or provide a link to a new image, called from Nodes component */
  updateImageURL(url){
    this.setState({
      image: url
    })
  }

  /* toggle which color nodes are visable using checkboxes in toolbox */
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

  /* Select the color for any new nodes */
  selectColor(color){
    this.setState({
      color: color
    })
  }

  /* Select the size for any new nodes */
  selectSize(size){
    this.setState({
      size: size
    })
  }

  /* Hide edit container and info container, this is called when a node is deleted in Editor */
  updateEditState(){
    this.setState({
      selectedNode: null,
      editNode: null,
      shouldDisplayInfo: false,
      shouldDisplayEditor: false
    })
  }

  /* Turn the ability to add new nodes on and off using toggle in toolbox */
  toggleAddNode(state){
    this.setState({
      addNodeEnabled: state
    })
  }

  /* Hide and show the legend using the toggle in toolbox */
  toggleViewLegend(state){
    this.setState({
      viewLegend: state
    })
  }

  /* Generate a new node on the image container */
  newNode(x, y, color, size){
    let random = Math.random()*1000000;
    let newId = Math.round(random);
    let blankTemplate = ObjectUtil.copy(newNodeTemplate);
    blankTemplate.id = newId;
    blankTemplate.x = x;
    blankTemplate.y = y;
    blankTemplate.color = color;
    blankTemplate.size = size;

    this.actions.addNewNode(blankTemplate);
    this.setState({
      selectedNode: null,
      editNode: blankTemplate,
      shouldDisplayInfo: false,
      shouldDisplayEditor: true
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
    if(this.state.loading){
      return(
        <Col className='loading-container' xs={12} md={12}>
          <ReactLoading
            type="bars"
            color="#337ab7"
            height="200px"
            width="200px" />
        </Col>
      )
    }

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
            editNode = { this.state.editNode }
            newNode = { this.newNode }
            color = { this.state.color }
            size = { this.state.size }
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
                    currentSize = { this.state.size }
                    selectSize = { this.selectSize }
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
