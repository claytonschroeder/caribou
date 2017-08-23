const state = {
  nodes: []
}

export default function(update) {
  return {
    updateNode: (id, node) => {
      const index = state.nodes.findIndex(node => node.id === id);

      state.nodes = [
        ...state.nodes.slice(0, index),
        node,
        ...state.nodes.slice(index + 1)
      ];

      update();
    },
    updateNodeArray: (nodes) => {
      state.nodes = nodes;
      update();
    },
    getState: () => {
      return state;
    },
    updateState: (nodes) => {
      state.nodes = nodes.nodes;
      update()
    }
  }
};