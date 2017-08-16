import React, {Component} from 'react';

import Nodes from './components/Nodes.jsx'

import newNodeTemplate from './lib/nodeTemplate.json'

const ObjectUtil = require('./utilities/objectCopy.js');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNode: null,
      nodes: [
        {
          id: 12341412341,
          x: 145,
          y: 125,
          name: 'Node 1',
          notes: {
            summary: {
              id: 123411234,
              addedBy: 'Tim',
              description: 'this is an example of a summary',
              link: 'upstream water management and central platte hydrology',
              createdAt: '2017-08-03 19:58:16.145+00',
              updatedAt: '2017-08-03 19:58:16.145+00',
            },
            strongEvidence: [
              {
                detail: 'There a only 4 pallid sturgeon left in the entire world.',
                references: [
                  {
                    id: 41234112,
                    link: 'http://www.google.com',
                  },
                  {
                    id: 1234125132,
                    link: 'http://www.yahoo.com',
                  },
                  {
                    id: 1234125132,
                    link: 'http://www.cnn.com',
                  }
                ]
              },
              {
                detail: 'Pallid sturgeon can only breed on January 7 of years that are divisable by 9.',
                references: [
                  {
                    id: 41234112,
                    link: 'http://www.wikipedia.com',
                  }
                ]
              }
            ],
            weakEvidence: [
              {
                detail: 'Pallid sturgeon are thriving in some areas.',
                references: [
                  {
                    id: 131234,
                    link: 'http://www.google.ca',
                  }
                ]
              },
              {
                detail: 'Pallid sturgeon have no predators besides themselves.',
                references: [
                  {
                    id: 4992928,
                    link: 'http://www.wikipedia.com',
                  }
                ]
              }
            ],
            uncertain: [
              {
                detail: 'Pallid sturgeon can be up to 10,000 years old.'
              },
              {
                detail: 'Pallid sturgeon are dinosaurs.'
              },
              {
                detail: 'Pallid sturgeon can read the minds of fisherman.'
              }
            ]
          }
        }
      ]
    }
    this.onNewNode = this.onNewNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.displayNode = this.displayNode.bind(this);
  }

  onNewNode(x, y){
    let random = Math.random()*1000000;
    let newId = Math.round(random);
    let blankTemplate = ObjectUtil.copy(newNodeTemplate);
    let nodeArray = this.state.nodes;
    blankTemplate.id = newId;
    blankTemplate.x = x;
    blankTemplate.y = y - 10;
    nodeArray.push(blankTemplate);
    this.setState({nodes: nodeArray})
  }

  deleteNode(id){
    console.log('in app: ', id)
    let nodes = this.state.nodes
    let updatedNodeArray = nodes.filter((node) => {
      return node.id !== id
    })
    console.log(updatedNodeArray)
    this.setState({
      nodes: updatedNodeArray
    })
  }

  displayNode(){
    console.log('display node')
  }

  render() {
    return (
      <Nodes
        nodes = { this.state.nodes }
        onNewNode = { this.onNewNode }
        deleteNode = { this.deleteNode }
      />
    );
  }
}
export default App;
