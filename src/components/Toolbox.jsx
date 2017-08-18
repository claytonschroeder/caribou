import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Panel, Button, Tabs, Tab, FormGroup, ControlLabel, FormControl, Radio, Checkbox } from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';

class Toolbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 1,
      toggleActive: false
    }
    this.onToggle = this.onToggle.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  onToggle() {
    this.props.toggleAddNode(!this.state.toggleActive)
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  setColor(color){
    this.props.selectColor(color.currentTarget.value)
  }

  render() {
      const colorPicker = (
        <FormGroup>
          <Radio name="colorPickerToolbox" inline value="red" defaultChecked={ this.props.currentColor === 'red' ? true : false } onClick={ this.setColor }>
            Red
          </Radio>
          {'  '}
          <Radio name="colorPickerToolbox" inline value="blue" defaultChecked={ this.props.currentColor === 'blue' ? true : false } onClick={ this.setColor }>
            Blue
          </Radio>
          {'  '}
          <Radio name="colorPickerToolbox" inline value="green" defaultChecked={ this.props.currentColor === 'green' ? true : false } onClick={ this.setColor }>
            Green
          </Radio>
        </FormGroup>
      )
      const toolbox = (
        <Panel id="toolbox-panel" header="Toolbox" bsStyle="success">
          <Tabs defaultActiveKey={1} onSelect={ key => this.setState({activeTab: key}) } id="uncontrolled-tab-example">

            <Tab eventKey={1} title="Add Nodes">
              <Toggle
                onClick={ this.onToggle }
                size="sm"
                offstyle="danger"
                active={ this.state.toggleActive } />
                {
                  this.state.toggleActive ? colorPicker : null
                }
            </Tab>


            <Tab eventKey={2} title="Filter View">
              <p>some way to filter which nodes you can and cant see</p>
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