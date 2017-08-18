import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Panel, Button, Tabs, Tab, FormGroup, ControlLabel, FormControl, Radio, Checkbox } from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';

class Toolbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 1,
      toggleActive: false,
    }
    this.onToggle = this.onToggle.bind(this);
    this.setColor = this.setColor.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  onToggle() {
    this.props.toggleAddNode(!this.state.toggleActive)
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  updateFilter(color){
    switch(color.currentTarget.value){
      case 'red':
        this.props.filterNodes('red')
      break;
      case 'blue':
        this.props.filterNodes('blue')
      break;
      case 'green':
        this.props.filterNodes('green')
      break;
    }
  }

  setColor(color){
    this.props.selectColor(color.currentTarget.value)
  }

  render() {
      const colorPicker = (
        <FormGroup>
          <p>Select the color for your new node</p>
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
              <p>Ability to add nodes is currently: </p>
              <Toggle
                onClick={ this.onToggle }
                size="sm"
                onstyle="success"
                offstyle="danger"
                active={ this.state.toggleActive } />
                {
                  this.state.toggleActive ? colorPicker : null
                }
            </Tab>


            <Tab eventKey={2} title="Filter View">
              <p>Select which color nodes you would like to display</p>
              <FormGroup>
                <Checkbox inline value='red' ref='red' defaultChecked={ this.props.redSelected ? true : false } onClick={ this.updateFilter }>
                  Red
                </Checkbox>
                {'  '}
                <Checkbox inline value='blue' ref='blue' defaultChecked={ this.props.blueSelected ? true : false } onClick={ this.updateFilter }>
                  Blue
                </Checkbox>
                {'  '}
                <Checkbox inline value='green' ref='green' defaultChecked={ this.props.greenSelected ? true : false } onClick={ this.updateFilter }>
                  Green
                </Checkbox>
              </FormGroup>
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