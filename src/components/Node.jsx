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

  findSize(size){
    switch(size){
      case 'xs':
        return '10px'
      break;
      case 's':
        return '20px'
      break;
      case 'm':
        return '30px'
      break;
      case 'l':
        return '40px'
      break;
      case 'xl':
        return '50px'
      break;
    }
  }

  findOffset(size){
    switch(size){
      case 'xs':
        return 5
      break;
      case 's':
        return 10
      break;
      case 'm':
        return 15
      break;
      case 'l':
        return 20
      break;
      case 'xl':
        return 25
      break;
    }
  }

  render() {
    const display = this.shouldDisplay(this.props.data.color);

    const visibility = this.props.data.hidden ? 'hidden' : 'visible';

    const size = this.findSize(this.props.data.size);

    const offset = this.findOffset(this.props.data.size);

    let nodeStyle = {
      height: size,
      width: size,
      left: this.props.data.x - offset + 'px',
      top: this.props.data.y - offset + 'px',
      backgroundColor: this.props.data.color,
      display: display,
      visibility: visibility
    }
    const klass = ( (this.props.selectedNode && this.props.selectedNode.id === this.props.data.id) || (this.props.editNode && this.props.editNode.id === this.props.data.id) ) ? 'single-node-selected' : 'single-node'
    return (
      <div className={ klass } style={nodeStyle} onClick={ () => this.props.selectNode(this.props.data.id) }>
      </div>
    );
  }
}
export default Node;