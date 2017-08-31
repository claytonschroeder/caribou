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
      }
    } : null;

    const data = this.props.chartData ? {
      labels: this.props.chartData.labels,
      datasets: [
      // we can send throught multiple lines at a time by adding another object.
        {
          label: this.props.chartData.alternative[0],
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.chartData.data[0]
        },
        {
          label: this.props.chartData.alternative[1],
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(255,99,132,0.4)',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.chartData.data[1]
        }
      ]
    }: null;
    const content = this.props.chartData ? (
      <Line
        options={ options }
        data={ data } />
    ) : <span>select your data</span>;
    return(
      <Col xs={12} md={8}>
        { content }
      </Col>
    )
  }
}
export default Chart;
