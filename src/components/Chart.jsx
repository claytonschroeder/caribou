import React, { Component } from 'react';
import { Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import ReactLoading from 'react-loading';
import data from '../lib/testData/arrayOfObj.json';
import Api from '../lib/api.js';
import store from '../flux/store.js';
import actions from '../flux/actions.js';

const ObjectUtil = require('../utilities/objectCopy.js');

import { Line } from 'react-chartjs-2';


class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    const options = this.props.chartData ? {
      title: {
        display: true,
        text: this.props.chartData.location + ' - ' + this.props.chartData.year
      },
      legend: {
        position: 'right'
      }
    } : null;

    const scales = this.props.chartData ? {
      yAxes: [{
          display: true,
          ticks: {
            mirror: true,
            beginAtZero: true
          }
        }]
      } : null;

    const data = this.props.chartData ? {
      labels: this.props.chartData.labels,
      datasets: this.props.chartData.data
    }: null;
    const content = this.props.chartData ? (
      <Line
        options={ options }
        data={ data }
        scales={ scales } />
    ) : <span>select your data</span>;
    return(
      <Col xs={12} md={10}>
        { content }
      </Col>
    )
  }
}
export default Chart;
