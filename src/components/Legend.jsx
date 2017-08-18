import React, {Component} from 'react';
import { Panel, Button, Tabs, Tab, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Legend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleActive: true
    }
    this.onToggle = this.onToggle.bind(this);

  }

  onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  render() {
    return(
      <Panel className='legend' header={ 'Legend' }>
        {
          this.props.nodes.map((node, index) => {
            return (
              <div key={ index } className='legend-item'>
                <div className='icon' style={{backgroundColor: node.color, borderRadius: '50%', height: '15px', width: '15px'}}>
                </div>
                <span>
                  { node.name ? node.name : 'No Name' }
                </span>
              </div>
            )
          })
        }
      </Panel>
    )
  }
}
export default Legend;