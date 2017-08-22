const state = {
  nodes: [
    {
      id: 12341412341,
      x: 173,
      y: 165,
      name: 'English Bay',
      color: 'red',
      hidden: false,
      notes: {
        summary: {
          id: 123411234,
          addedBy: 'Tim',
          description: 'English Bay Beach, also called First Beach, located along Beach Ave between Gilford St and Bidwell St, is the most populated beach area in Vancouvers downtown area. The Stanley Park Seawall, a popular running and biking route, runs along the east side of the beach.',
          createdAt: '2017-08-03 19:58:16.145+00',
          updatedAt: '2017-08-03 19:58:16.145+00',
        },
        strongEvidence: [
          {
            detail: 'On any given day, a dozen deep-sea freighters rest at anchor in English Bay, waiting to dock in Vancouver’s busy harbour.',
            references: [
              {
                id: 41234112,
                link: 'https://www.theglobeandmail.com/news/british-columbia/vancouver-divided-on-risks-of-oil-tankers',
                attachment: null,
                fileName: null
              },
              {
                id: 1234125132,
                link: 'https://www.theglobeandmail.com/news/british-columbia/vancouver-divided-on-risks-of-oil-tankers',
                attachment: null,
                fileName: null
              },
              {
                id: 1234125132,
                link: 'https://www.theglobeandmail.com/news/british-columbia/vancouver-divided-on-risks-of-oil-tankers',
                attachment: null,
                fileName: null
              }
            ]
          },
          {
            detail: 'If the Trans Mountain Pipeline proposal, now under review by a parliamentary panel, is approved, oil tanker traffic through the harbour will increase from about one a week, to one a day. (The exact figures are from five a month to 34 a month.)',
            references: [
              {
                id: 1234121232344444,
                link: 'https://www.theglobeandmail.com/news/british-columbia/vancouver-divided-on-risks-of-oil-tankers',
                attachment: null,
                fileName: null
              }
            ]
          }
        ],
        weakEvidence: [
          {
            detail: '8,000 people walk or bike the Seawall on a typical summer day, with 14,000 more using the beaches, that proposed increase in tanker traffic has raised real fears because the additional ships will be filled with oil.',
            references: [
              {
                id: 131234,
                link: 'https://www.theglobeandmail.com/news/british-columbia/vancouver-divided-on-risks-of-oil-tankers',
                attachment: null,
                fileName: null
              }
            ]
          },
          {
            detail: 'A proposal to add one more ship a day to that mix wouldn’t raise any concerns.',
            references: [
              {
                id: 4992928,
                link: 'https://www.theglobeandmail.com/news/british-columbia/vancouver-divided-on-risks-of-oil-tankers',
                attachment: null,
                fileName: null
              }
            ]
          }
        ],
        uncertain: [
          {
            detail: 'B.C.’s coastal waters could soon be home to a growing number of oil tankers.'
          },
          {
            detail: 'Enbridge Inc.’s proposed Northern Gateway project would create a comparably busy route, in a far more isolated region – shipping oil from Kitimat through the narrow, often rough waters of the Douglas Channel.'
          },
          {
            detail: 'It’s true that a spill such as the Marathassa’s would not have much in common with that of a big, bitumen-bearing tanker.'
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