import React, {Component} from 'react';
import { Panel, Button, Tabs, Tab, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

class Legend extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Panel className='legend' header={ 'Legend' }>
        {
          this.props.nodes.map((node, index) => {
            return (
              <div key={ index } className='legend-item'>
                <Checkbox inline defaultChecked={ !node.hidden } onClick={ () => this.props.hideNode(node.id) }>
                </Checkbox>
                <div className='legend-detail' onClick={ () => this.props.selectNode(node.id) }>
                  <div className='icon' style={{backgroundColor: node.color, borderRadius: '50%', height: '15px', width: '15px'}}>
                  </div>
                  <span>
                    { node.name ? node.name : 'No Name' }
                  </span>
                </div>
              </div>
            )
          })
        }
      </Panel>
    )
  }
}
export default Legend;