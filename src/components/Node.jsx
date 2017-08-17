import React, {Component} from 'react';

class Node extends Component {
  constructor(props) {
    super(props);

    this.selectedNode = this.selectedNode.bind(this);
  }

  selectedNode(event) {
    event.stopPropagation();
    let id = event.currentTarget.id
    this.props.selectNode(id)
  }

  render() {
    let nodeStyle = {
      left: this.props.data.x + 'px',
      top: this.props.data.y + 'px'
    }
    return (
      <div id={this.props.data.id} className='single-node' style={nodeStyle} onClick={ this.selectedNode }>
      </div>
    );
  }
}
export default Node;