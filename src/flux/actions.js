export default function(store) {
  return {
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
    }
  }
}
