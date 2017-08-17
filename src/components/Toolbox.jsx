import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Panel, Button, Tabs, Tab, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Toolbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 1,
    }
  }


  render() {
      const toolbox = (
        <Panel id="toolbox-panel" header="Toolbox" bsStyle="success">
          <Tabs defaultActiveKey={1} onSelect={ key => this.setState({activeTab: key}) } id="uncontrolled-tab-example">

            <Tab eventKey={1} title="Add Nodes">
              <p>toggle to add nodes. and select the nodes color</p>
            </Tab>


            <Tab eventKey={2} title="Another Tool">
              <p>Some other tool</p>
            </Tab>
          </Tabs>
        </Panel>
      )

    return (
      <div className='editor-container'>
        { toolbox }
      </div>
    );
  }
}
export default Toolbox;