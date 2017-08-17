const state = {
  nodes: [
    {
      id: 12341412341,
      x: 145,
      y: 125,
      name: 'Node 1',
      color: 'red',
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
                id: 1234121232344444,
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
    }
  }
};