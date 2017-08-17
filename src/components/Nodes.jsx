import React, {Component} from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Node from './Node.jsx'

class Nodes extends Component {
  constructor(props) {
    super(props);

    this.getLocation = this.getLocation.bind(this);
    this.selectNode = this.selectNode.bind(this);
  }

  getLocation(clickEvent){
    let x = clickEvent.nativeEvent.offsetX;
    let y = clickEvent.nativeEvent.offsetY;
    this.props.newNode(x, y)
  }

  selectNode(id){
    this.props.selectNode(id)
  }

  render() {
    let imageStyle = {
      width: '100%'
    }

    const nodes = this.props.nodes.map((node) => {
      return <Node
        key = {node.id}
        data = {node}
        selectNode = {this.selectNode} />

    })

    return (
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <img src='/build/images/FraserValley.png' onClick={this.getLocation } style={imageStyle}>
            </img>
            { nodes }
          </Col>
        </Row>
    );
  }
}
export default Nodes;