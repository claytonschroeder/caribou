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
    this.getPrettyDate = this.getPrettyDate.bind(this);

  }

  getPrettyDate(date){
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const month = parseInt(date.slice(0,2)) - 1;
    const day = parseInt(date.substr(3));
    return monthArray[month] + " " + day
  }

  getParams(){
    function validate(startDate, endDate){
      const startMonth = parseInt(startDate.slice(0,2));
      const endMonth = parseInt(endDate.slice(0,2));
      const startDay = parseInt(startDate.substr(3));
      const endDay = parseInt(endDate.substr(3));
      if(endMonth < startMonth){
        return false
      }
      if((endMonth === startMonth) && (endDay <= startDay)){
        return false
      }
      return true
    }

    const startDate = findDOMNode(this.refs.startdate).value;
    const endDate = findDOMNode(this.refs.enddate).value;
    const yr = findDOMNode(this.refs.year).value;
    const lc = findDOMNode(this.refs.locations).value;

    const validDate = validate(startDate, endDate)

    if(validDate){
      this.setState({
        validationState: null
      }, this.props.setParams(yr, lc, startDate, endDate))
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
        <ControlLabel>Select Date Range</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='startdate'>
          {
            dates.map((date, index) => {

              return (<option key={ index } value={ date }>{ this.getPrettyDate(date) }</option>)
            })
          }
        </FormControl>

        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='enddate'>
          {
            dates.map((date, index) => {
              return (<option key={ index } value={ date }>{ this.getPrettyDate(date) }</option>)
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
