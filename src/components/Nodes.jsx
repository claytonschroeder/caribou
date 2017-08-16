import React, {Component} from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import Node from './Node.jsx'
import Info from './Info.jsx'

class Nodes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInfo: false,
      displayInfoNodeId: null,
    };

    this.getClickDetails = this.getClickDetails.bind(this);
    this.selectNode = this.selectNode.bind(this);
    this.deleteThisNode = this.deleteThisNode.bind(this);
  }

  getClickDetails(clickEvent){
    let x = clickEvent.nativeEvent.offsetX;
    let y = clickEvent.nativeEvent.offsetY;
    this.props.onNewNode(x, y)
  }

  selectNode(id){
    this.setState({displayInfo: true, displayInfoNodeId: id})
  }

  deleteThisNode(id){
    console.log('delete in nodes: ', id)
    console.log(this.props)
    this.props.deleteNode(id)
  }

  render() {
    let imageStyle = {
      width: '100%'
    }

    const info = this.state.displayInfo ? (
      <Info
        nodes = { this.props.nodes }
        selectedId = { this.state.displayInfoNodeId }
        deleteThisNode = { this.deleteThisNode } />
    ) : null

    const nodes = this.props.nodes.map((node) => {
      return <Node
        key = {node.id}
        data = {node}
        selectNode = {this.selectNode} />

    })

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <img src='/build/images/PallidSturgeon.png' onClick={this.getClickDetails } style={imageStyle}>
            </img>
            { nodes }
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            { info }
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default Nodes;