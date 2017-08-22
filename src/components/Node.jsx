import React, {Component} from 'react';

class Node extends Component {
  constructor(props) {
    super(props);
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
      case 'initial':
        return this.props.initialSelected ? 'block' : 'none'
      break;
    }
  }

  render() {
    const display = this.shouldDisplay(this.props.data.color)
    const visibility = this.props.data.hidden ? 'hidden' : 'visible'
    let nodeStyle = {
      left: this.props.data.x + 'px',
      top: this.props.data.y + 'px',
      backgroundColor: this.props.data.color,
      display: display,
      visibility: visibility
    }
    const klass = ( this.props.selectedNode && this.props.selectedNode.id === this.props.data.id) ? 'single-node-selected' : 'single-node'
    return (
      <div className={ klass } style={nodeStyle} onClick={ () => this.props.selectNode(this.props.data.id) }>
      </div>
    );
  }
}
export default Node;