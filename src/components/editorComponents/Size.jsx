import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Radio, FormGroup } from 'react-bootstrap';

class Size extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }


  render(){
    const node = this.props.node;
    return (
      <FormGroup>
        <Radio name="sizePicker" inline value="xs" checked={ node.size === 'xs' ? true : false } onChange={ (size) => this.props.setSize(size, node.id) }>
          XS
        </Radio>
        {'  '}
        <Radio name="sizePicker" inline value="s" checked={ node.size === 's' ? true : false } onChange={ (size) => this.props.setSize(size, node.id) }>
          S
        </Radio>
        {'  '}
        <Radio name="sizePicker" inline value="m" checked={ node.size === 'm' ? true : false } onChange={ (size) => this.props.setSize(size, node.id) }>
          M
        </Radio>
        <Radio name="sizePicker" inline value="l" checked={ node.size === 'l' ? true : false } onChange={ (size) => this.props.setSize(size, node.id) }>
          L
        </Radio>
        <Radio name="sizePicker" inline value="xl" checked={ node.size === 'xl' ? true : false } onChange={ (size) => this.props.setSize(size, node.id) }>
          XL
        </Radio>
      </FormGroup>
    )
  }
}

export default Size