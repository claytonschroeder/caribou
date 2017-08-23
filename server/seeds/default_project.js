const nodeObject =  {
  nodes: [
    {
      id: 12341412341,
      x: 188,
      y: 180,
      name: 'Node 1',
      color: 'initial',
      size: 'l',
      hidden: false,
      notes: {
        summary: {
          id: 123411234,
          addedBy: 'Tim',
          description: 'Central Platte River flows are highly managed. Storeage resevoirs and irrigation infrastructure has effectively stabalized the hydrograph of the central Platte. Peak flow magnatudes have been reduced due to storage and summer low flows have been increased due to irrigation return flows',
          createdAt: '2017-08-03 19:58:16.145+00',
          updatedAt: '2017-08-03 19:58:16.145+00',
        },
        strongEvidence: [
          {
            detail: 'There are approximately 7,000,000 acre-ft of storage in the North Platter River basin and 1,000,000 acre-ft of storage in the South Platte.',
            references: [
              {
                id: 41234112,
                link: 'https://www.theglobeandmail.com/news/british-columbia/vancouver-divided-on-risks-of-oil-tankers',
                attachment: null,
                fileName: null
              }
            ]
          },
          {
            detail: 'Ittigation storage and operations have stabalized Central Platte River flows over time, reducing late-spring runoff magnitude and duration and increasing baseflows during the summer period.',
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
        weakEvidence: [],
        uncertain: []
      }
    }
  ]
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
  .then(function () {
    // Inserts seed entries
    return knex('projects').insert([
      {
        id: 1,
        name: 'Pallid Demo',
        image: 'http://localhost:8000/build/images/PallidSturgeon.png',
        nodes: nodeObject
      }
    ]);
  });
};