import React, {Component} from 'react';
import { Grid, Col, Row, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import Node from './Node.jsx'
import Legend from './Legend.jsx'

import FileBase64 from 'react-file-base64';


class Nodes extends Component {
  constructor(props) {
    super(props);
    this.state={
      imageURL: null
    }
    this.getLocation = this.getLocation.bind(this);
    this.selectNode = this.selectNode.bind(this);
    this.sendUrl = this.sendUrl.bind(this);
    this.imageURL = this.imageURL.bind(this);
    this.hideNode = this.hideNode.bind(this);
  }

  hideNode(id){
    this.props.hideNode(id)
  }

  getLocation(clickEvent){
    let color = this.props.color ? this.props.color : 'red'
    let size = this.props.size
    let x = clickEvent.nativeEvent.offsetX;
    let y = clickEvent.nativeEvent.offsetY;
    this.props.newNode(x, y, color, size)
  }

  selectNode(id){
    this.props.selectNode(id)
  }

  imageURL(url){
    this.setState({
      imageURL: url.currentTarget.value
    })
  }

  sendUrl(){
    this.props.updateImageURL(this.state.imageURL)
  }

  render() {
    let imageStyle = {
      width: '100%'
    }

    const nodes = this.props.nodes ? this.props.nodes.map((node) => {
      return <Node
        selectedNode = { this.props.selectedNode }
        editNode = { this.props.editNode }
        key = { node.id }
        data = { node }
        selectNode = {this.selectNode}
        redSelected = { this.props.redSelected }
        blueSelected = { this.props.blueSelected }
        greenSelected = { this.props.greenSelected }
        initialSelected = { this.props.initialSelected } />

    }) : null

    const content = this.props.image ? (
      <Col className='image-container' xs={12} md={12}>
        <img className='image' src={ this.props.image } onClick={ this.props.addNodeEnabled ? this.getLocation : null} style={ imageStyle }>
        </img>
        {
          this.props.viewLegend ? (
            <Legend
              hideNode = { this.hideNode }
              selectNode = {this.selectNode}
              nodes={ this.props.nodes } />
          ) : null
        }
        { nodes }
      </Col>
    ) : (
      <Col className='add-image' xs={12} md={12}>
        <div className='add-image-form'>
          <form>
            <FormGroup controlId="addImage">
              <ControlLabel>Copy and paste your image URL:</ControlLabel>
              <FormControl
                type="text"
                value={ this.props.imageURL }
                placeholder="Enter URL"
                onChange={ this.imageURL }
              />
              <ControlLabel>OR upload an image from your computer:</ControlLabel>
              <FileBase64
                multiple={ false }
                onDone={ this.props.uploadImage } />
              <FormControl.Feedback />
              <HelpBlock>The ideal image size is 1000 pixels x 500pixels. Larger images will require you to scroll, while smaller images will not take up the entire space.</HelpBlock>
              <Button id="load-image-button" bsStyle="success" onClick={ this.sendUrl } >Load Image</Button>
            </FormGroup>
          </form>
        </div>
      </Col>
    )

    const loading = this.props.loading ? (
      <Col className='add-image' xs={12} md={12}>
        <div className='add-image-form'>
          <form>
            <FormGroup controlId="addImage">
              <ControlLabel>Copy and paste your image URL:</ControlLabel>
              <FormControl
                type="text"
                value={ this.props.imageURL }
                placeholder="Enter URL"
                onChange={ this.imageURL }
              />
              <ControlLabel>OR upload an image from your computer:</ControlLabel>
              <FileBase64
                multiple={ false }
                onDone={ this.props.uploadImage } />
              <FormControl.Feedback />
              <HelpBlock>The ideal image size is 1000 pixels x 500pixels. Larger images will require you to scroll, while smaller images will not take up the entire space.</HelpBlock>
              <Button id="load-image-button" bsStyle="success" onClick={ this.sendUrl } >Load Image</Button>
            </FormGroup>
          </form>
        </div>
      </Col>
    ) : null
    return (
        <Row className="show-grid">
          { content }
        </Row>
    );
  }
}
export default Nodes;