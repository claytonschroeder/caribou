import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Panel, Button, Tabs, Tab, FormGroup, ControlLabel, FormControl, Radio, Checkbox, Alert } from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';

class Toolbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 1,
      toggleActive: false,
      toggleActiveLegend: true
    }
    this.onToggle = this.onToggle.bind(this);
    this.onToggleLegend = this.onToggleLegend.bind(this);
    this.setColor = this.setColor.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.setSize = this.setSize.bind(this);
  }

  onToggle() {
    this.props.toggleAddNode(!this.state.toggleActive)
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  onToggleLegend(){
    this.props.toggleViewLegend(!this.state.toggleActiveLegend)
    this.setState({ toggleActiveLegend: !this.state.toggleActiveLegend });
  }

  shouldDisplayAlert(color){
    switch(color){
      case 'red':
        return !this.props.redSelected ? true : false
      break;
      case 'blue':
        return !this.props.blueSelected ? true : false
      break;
      case 'green':
        return !this.props.greenSelected ? true : false
      break;
      case 'initial':
        return !this.props.initialSelected ? true : false
      break;
    }
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
      case 'initial':
        this.props.filterNodes('initial')
      break;
    }
  }

  setColor(color){
    this.props.selectColor(color.currentTarget.value)
  }

  setSize(size){
    this.props.selectSize(size.currentTarget.value)
  }

  render() {
      const displayAlert = this.shouldDisplayAlert(this.props.currentColor)
      const alert = displayAlert ? (
        <Alert bsStyle="warning">
          <strong>Warning: </strong> You have selected a color that is currently hidden in the filter views panel. You will not be able to see your node.
        </Alert>
      ) : null
      const colorPicker = (
        <FormGroup>
          <p>Select a color for your node:</p>
          <div className='radio-button-container'>
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
            <Radio name="colorPickerToolbox" inline value="initial" defaultChecked={ this.props.currentColor === 'initial' ? true : false } onClick={ this.setColor }>
              None
            </Radio>
            {'  '}
            { alert }
          </div>
        </FormGroup>
      )
      const sizePicker = (
        <FormGroup>
          <p>Select the size of your node:</p>
          <div className='radio-button-container'>
            <Radio name="sizePickerToolbox" inline value="xs" defaultChecked={ this.props.currentSize === 'xs' ? true : false } onClick={ this.setSize }>
              XS
            </Radio>
            {'  '}
            <Radio name="sizePickerToolbox" inline value="s" defaultChecked={ this.props.currentSize === 's' ? true : false } onClick={ this.setSize }>
              S
            </Radio>
            {'  '}
            <Radio name="sizePickerToolbox" inline value="m" defaultChecked={ this.props.currentSize === 'm' ? true : false } onClick={ this.setSize }>
              M
            </Radio>
            <Radio name="sizePickerToolbox" inline value="l" defaultChecked={ this.props.currentSize === 'l' ? true : false } onClick={ this.setSize }>
              L
            </Radio>
            {'  '}
            <Radio name="sizePickerToolbox" inline value="xl" defaultChecked={ this.props.currentSize === 'xl' ? true : false } onClick={ this.setSize }>
              XL
            </Radio>
          </div>
        </FormGroup>
      )

      const toolbox = (
        <Panel id="toolbox-panel" header="Toolbox">
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
                {
                  this.state.toggleActive ? sizePicker : null
                }
            </Tab>


            <Tab eventKey={2} title="Filter View">
              <p>Select which nodes you would like to display:</p>
              <FormGroup>
                <div className='checkbox-button-container'>
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
                  <Checkbox inline value='initial' ref='initial' defaultChecked={ this.props.initialSelected ? true : false } onClick={ this.updateFilter }>
                    None
                  </Checkbox>
                  {'  '}
                </div>
              </FormGroup>
              <p>View Legend: </p>
              <Toggle
                onClick={ this.onToggleLegend }
                size="sm"
                onstyle="success"
                offstyle="danger"
                active={ this.state.toggleActiveLegend } />
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