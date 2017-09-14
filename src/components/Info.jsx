import React, { Component } from 'react';
import { Grid, Col, Row, Panel } from 'react-bootstrap';

import Api from '../lib/api.js';
import store from '../flux/store.js';
import actions from '../flux/actions.js';

const ObjectUtil = require('../utilities/objectCopy.js');


class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  componentDidMount(){
  }


  render() {
    const zone = this.props.zone ? this.props.zone : null;
    let ecoIcon;
    if(zone){
      if(zone.eco_type === 'Boreal'){
        ecoIcon = (
          <img className='icon' src="/build/images/tree.png" ></img>
        )
      }
      if(zone.eco_type === 'Mountain'){
        ecoIcon = (
          <img className='icon' src="/build/images/mountain.png" ></img>
        )
      }
      if(zone.eco_type === 'Northern'){
        ecoIcon = (
          <img className='icon' src="/build/images/snow.png" ></img>
        )
      }
    }
    console.log(ecoIcon)
    const content = zone ? (
      <Panel header={ zone.herd_name } className='info'>
        <h5 className='sub-heading'>Scientific Name</h5>
        <p className='detail'>{ zone.scientific_name ? zone.scientific_name : 'no data' }</p>


        <h5 className='sub-heading'>Eco Type</h5>
        <div className='eco-region'>
          <p className='detail'>{ zone.eco_type ? zone.eco_type : 'no data' }</p>
          { ecoIcon }
        </div>

        <h5 className='sub-heading'>Status</h5>
        <p className='detail'>{ zone.status ? zone.status : 'no data' }</p>

        <h5 className='sub-heading'>Population</h5>
        <p className='detail'>{ zone.population ? zone.population : 'no data' }</p>

        <h5 className='sub-heading'>Range</h5>
        <p className='detail'>{ zone.range ? zone.range : 'no data' }</p>

        <h5 className='sub-heading'>Last Survey</h5>
        <p className='detail'>{ zone.last_survey ? zone.last_survey : 'no data' }</p>
      </Panel>
    ) : (
      <Panel header="Herd Info" className='info'>
        <p className='detail'>Select a herd by clicking on a region on the map. Or, click on a heard from the list on the right.</p>
      </Panel>
    )
    return (
      <div>
        { content }
      </div>
    );
  }
}
export default Info;
