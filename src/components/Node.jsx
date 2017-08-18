import React, {Component} from 'react';

class Node extends Component {
  constructor(props) {
    super(props);
    this.selectedNode = this.selectedNode.bind(this);
  }

  shouldDisplay(color){
    switch(color){
      case 'red':
        return this.props.redSelected ? 'block' : 'none'
      break;
      case 'blue':
        return this.props.blueSelected ? 'block' : 'none'
      break;
      case 'green':
        return this.props.greenSelected ? 'block' : 'none'
      break;
    }
  }

  selectedNode(event) {
    event.stopPropagation();
    let id = event.currentTarget.id
    this.props.selectNode(id)
  }

  render() {
    const display = this.shouldDisplay(this.props.data.color)
    let nodeStyle = {
      left: this.props.data.x + 'px',
      top: this.props.data.y + 'px',
      backgroundColor: this.props.data.color,
      display: display
    }
    return (
      <div id={this.props.data.id} className='single-node' style={nodeStyle} onClick={ this.selectedNode }>
      </div>
    );
  }
}
export default Node;