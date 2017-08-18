import newNodeTemplate from '../lib/nodeTemplate.json'
const ObjectUtil = require('../utilities/objectCopy.js');

export default function(store) {
  return {
    updateName: (id, data) => {
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // modify the specific item inside the node
      node.name = data.name;

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    updateSummary: (id, data) => {
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // modify the specific item inside the node
      node.notes.summary = { ...node.notes.summary, ...data };

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    updateStrongEvidence: (id, data) => {

      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // modify the specific item inside the node
      node.notes.strongEvidence = data;

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    updateWeakEvidence: (id, data) => {

      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // modify the specific item inside the node
      node.notes.weakEvidence = data;

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    updateUncertainEvidence: (id, data) => {

      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // modify the specific item inside the node
      node.notes.uncertain = data;

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    deleteNode: (id) => {

      let nodeArray = store.getState().nodes;

      let newNodeArray = nodeArray.filter((node) => {
        return node.id !== id
      })

      store.updateNodeArray(newNodeArray);
    },
    addNewNode: (x, y, color) => {
      let nodeArray = store.getState().nodes;
      let random = Math.random()*1000000;
      let newId = Math.round(random);
      let blankTemplate = ObjectUtil.copy(newNodeTemplate);
      blankTemplate.id = newId;
      blankTemplate.x = x;
      blankTemplate.y = y - 10;
      blankTemplate.color = color;
      nodeArray.push(blankTemplate);
      store.updateNodeArray(nodeArray);
    },
    addNewStrongEvidence: (id) => {
      const strongTemplate = {
        "detail": null,
        "references": [
          {
            "id": null,
            "link": null
          }
        ]
      }
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // push a blank row onto the array
      node.notes.strongEvidence.push(strongTemplate);

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    addNewWeakEvidence: (id) => {
      const weakTemplate = {
        "detail": null,
        "references": [
          {
            "id": null,
            "link": null
          }
        ]
      }
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // push a blank row onto the array
      node.notes.weakEvidence.push(weakTemplate);

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    addNewUncertainEvidence: (id) => {
      const uncertainTemplate = {
        "detail": null
      }
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // push a blank row onto the array
      node.notes.uncertain.push(uncertainTemplate);

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    changeColor: (id, color) => {
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };
      // change the color of the node
      node.color = color;

      // update the node in the state array
      store.updateNode(node.id, node);
    }
  }
}
