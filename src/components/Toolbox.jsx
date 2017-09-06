import React, { Component } from 'react';
import { Col, FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';
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

  componentDidMount() {
    this.getParams()
  }

  getParams(){
    function validate(startDate, endDate){
      let end = parseInt(endDate)
      let start = parseInt(startDate)
      if(end > start){
        return true
      } else {
        return false
      }
    }

    const startDate = findDOMNode(this.refs.startdate).value;
    const endDate = findDOMNode(this.refs.enddate).value;
    const year = findDOMNode(this.refs.year).value;
    const location = findDOMNode(this.refs.locations).value;
    const type = findDOMNode(this.refs.type).value;

    const validDate = validate(startDate, endDate)

    if(validDate){
      this.setState({
        validationState: null
      }, this.props.setParams(year, location, startDate, endDate, type))
    } else {
      this.setState({
        validationState: 'error'
      })
    }
  }


  render() {
    const alternatives = this.props.alternatives ? this.props.alternatives : null;
    const dates = this.props.dates ? this.props.dates : null;
    const years = this.props.years ? this.props.years : null;
    const dataType = this.props.dataType ? this.props.dataType : null;
    const locations = this.props.locations ? this.props.locations : null;
    const models = this.props.models ? this.props.models : null;

    const params = this.props.alternatives && this.props.dates && this.props.locations && this.props.years ? (
      <form className='toolbox'>
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
        <ControlLabel>From:</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='startdate'>
          {
            dates.map((date, index) => {

              return (<option key={ index } value={ date }>{ date }</option>)
            })
          }
        </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelect" validationState={ this.state.validationState }>
        <ControlLabel>To:</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } defaultValue={ 365 }ref='enddate'>
          {
            dates.map((date, index) => {
              return (<option key={ index } value={ date }>{ date }</option>)
            })
          }
        </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select a Year</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='year'>
          {
            years.map((year, index) => {
              return (<option key={ index } value={ year }>{ year }</option>)
            })
          }
        </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select Data Type</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='type'>
          {
            dataType.map((type, index) => {
              return (<option key={ index } value={ type }>{ type }</option>)
            })
          }
        </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select Model</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='model'>
          {
            models.map((model, index) => {
              return (<option key={ index } value={ model }>{ model }</option>)
            })
          }
        </FormControl>
        </FormGroup>
      </form>
    ) : null




    return (
      <Col md={ 2 }>
        { params }
      </Col>
    );
  }
}
export default Toolbox;
