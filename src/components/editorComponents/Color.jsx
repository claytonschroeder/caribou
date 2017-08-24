import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Radio, FormGroup } from 'react-bootstrap';

class Color extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }


  render(){
    const node = this.props.node;
    return (
      <FormGroup>
        <Radio name="colorPickerEditor" inline value="red" checked={ node.color === 'red' ? true : false } onChange={ (color) => this.props.setColor(color, node.id) }>
          Red
        </Radio>
        {'  '}
        <Radio name="colorPickerEditor" inline value="blue" checked={ node.color === 'blue' ? true : false } onChange={ (color) => this.props.setColor(color, node.id) }>
          Blue
        </Radio>
        {'  '}
        <Radio name="colorPickerEditor" inline value="green" checked={ node.color === 'green' ? true : false } onChange={ (color) => this.props.setColor(color, node.id) }>
          Green
        </Radio>
        <Radio name="colorPickerEditor" inline value="initial" checked={ node.color === 'initial' ? true : false } onChange={ (color) => this.props.setColor(color, node.id) }>
          None
        </Radio>
      </FormGroup>
    )
  }
}

export default Color