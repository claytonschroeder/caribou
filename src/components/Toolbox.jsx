import React, { Component } from 'react';
import { Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import ReactLoading from 'react-loading';
import data from '../lib/testData/arrayOfObj.json';
import Api from '../lib/api.js';
import store from '../flux/store.js';
import actions from '../flux/actions.js';

const ObjectUtil = require('../utilities/objectCopy.js');


class Toolbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationState: null
    }

    this.getParams = this.getParams.bind(this);

  }

  getParams(){
    const yr = findDOMNode(this.refs.startyear).value;
    const lc = findDOMNode(this.refs.locations).value;

    this.props.setParams(yr, lc)

  }


  render() {
    const alternatives = this.props.alternatives ? this.props.alternatives : null;
    const dates = this.props.dates ? this.props.dates : null;
    const years = this.props.years ? this.props.years : null;
    const locations = this.props.locations ? this.props.locations : null;

    const content = this.props.alternatives && this.props.dates && this.props.locations && this.props.years ? (
      <form>

        <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select a Location</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='locations'>
          {
            locations.map((location, index) => {
              return (<option key={ index } value={ location }>{ location }</option>)
            })
          }
        </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsSelect" validationState={ this.state.validationState }>
        <ControlLabel>Select a Year</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='startyear'>
          {
            years.map((year, index) => {
              return (<option key={ index } value={ year }>{ year }</option>)
            })
          }
        </FormControl>
        </FormGroup>

        <Button bsStyle='success' onClick={ this.getParams }>Load Data</Button>

      </form>
    ) : null
    return (
      <Col xs={6} md={4}>
        { content }
      </Col>
    );
  }
}
export default Toolbox;
