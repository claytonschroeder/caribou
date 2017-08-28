import Api from '../lib/api.js';

export default function(store) {
  return {
    updateName: (id, data) => {
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // modify the specific item inside the node
      node.name = data;

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
    addNewNode: (blankTemplate) => {
      // create a copy of the current nodes
      let nodeArray = store.getState().nodes;

      // push the new node object onto the array
      nodeArray.push(blankTemplate);

      // update the state of node array
      store.updateNodeArray(nodeArray);
    },
    addNewStrongEvidence: (id) => {
      const strongTemplate = {
        "detail": null,
        "references": [
          {
            "id": null,
            "link": null,
            "attachment": null,
            "fileName": null
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
            "link": null,
            "attachment": null,
            "fileName": null
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
    },
    changeSize: (id, size) => {
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // change the size of the node
      node.size = size;

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    hideNode: (id) => {
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };
      // change the color of the node
      node.hidden = !node.hidden;

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    addNewStrongReference: (id, i) => {
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      let random = Math.random()*1000000;
      let newId = Math.round(random);

      // modify the specific item inside the node
      node.notes.strongEvidence[i].references.push({"id": newId, "link": ''});

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    addNewWeakReference: (id, i) => {
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      let random = Math.random()*1000000;
      let newId = Math.round(random);

      // modify the specific item inside the node
      node.notes.weakEvidence[i].references.push({"id": newId, "link": ''});

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    uploadAttachment: (file, evidenceIndex, referenceIndex, id, activeTab) => {
      let location;

      switch(activeTab){
        case 2:
          location = 'strongEvidence'
        break;
        case 3:
          location = 'weakEvidence'
        break;
      }

      let formData = new FormData(); // Currently empty

      formData.append('file', file[0], file[0].name);

      Api.upload('/projects/upload', formData).then(response => {
        // find the index of the node we want to modify
        const index = store.getState().nodes.findIndex(node => node.id === id);

        // create a copy of that node object
        const node = { ...store.getState().nodes[index] };

        // modify the specific item inside the node
        node.notes[location][evidenceIndex].references[referenceIndex].attachment = response.path;
        node.notes[location][evidenceIndex].references[referenceIndex].fileName = response.originalName;

        // update the node in the state array
        store.updateNode(node.id, node);

      })
    },
    removeAttachment: (evidenceIndex, referenceIndex, id, activeTab) => {
      let location;

      switch(activeTab){
        case 2:
          location = 'strongEvidence'
        break;
        case 3:
          location = 'weakEvidence'
        break;
      }
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // modify the specific item inside the node
      node.notes[location][evidenceIndex].references[referenceIndex].attachment = null;
      node.notes[location][evidenceIndex].references[referenceIndex].fileName = null;

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    removeLink: (evidenceIndex, referenceIndex, id, activeTab) => {
      let location;

      switch(activeTab){
        case 2:
          location = 'strongEvidence'
        break;
        case 3:
          location = 'weakEvidence'
        break;
      }
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      // modify the specific item inside the node
      node.notes[location][evidenceIndex].references[referenceIndex].link = null;

      // update the node in the state array
      store.updateNode(node.id, node);
    },
    updateCoordinates: (id, x, y) => {
      // find the index of the node we want to modify
      const index = store.getState().nodes.findIndex(node => node.id === id);

      // create a copy of that node object
      const node = { ...store.getState().nodes[index] };

      let size;
      switch(node.size){
        case 'xs':
          size = 10;
        break;
        case 's':
          size = 20;
        break;
        case 'm':
          size = 30;
        break;
        case 'l':
          size = 40;
        break;
        case 'xl':
          size = 50;
        break;
      }

      y = y - size;
      let offsetY = y;
      let offsetX = x;

      console.log(node)

      if(x > 0 && x > (size * 0.5)){
        offsetX = offsetX * 1.1
      }
      if(x < 0 && x < -(size * 0.5)){
        offsetX = offsetX * 1.1
      }

      if(y > 0 && y > (size * 0.5)){
        offsetY = offsetY * 1.1
      }
      if(y < 0 && y < -(size * 0.5)){
        offsetY = offsetY * 1.1
      }

      node.y = (node.y) + (offsetY);
      node.x = (node.x) + (offsetX);

      // update the node in the state array
      store.updateNode(node.id, node);
    }
  }
}
