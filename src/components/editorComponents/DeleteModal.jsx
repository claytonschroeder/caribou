import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Modal, Button } from 'react-bootstrap';

class Delete extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }


  render(){
    const node = this.props.node;
    return (
      <Modal bsSize="sm" show={ this.props.shouldDisplay } onHide={ this.props.hideDeleteModal }>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Once a node is deleted it cannot be recovered. Please confirm you want to delete this node.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.props.hideDeleteModal }>Close</Button>
          <Button bsStyle='danger' onClick={ () => this.props.deleteNode(node) }>Delete</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Delete