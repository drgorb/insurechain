/**
 * Objects DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function ObjectsDataService($q) {
  var users = [
    {
      manufacturer: 'Samsung',
      name: 'Galaxy Edge 7',
      type: 'Phone',
      serial: '12345677890',
      avatar: 'svg-1',
      description: 'It\'s a phone'
    },
    {
      manufacturer: 'Samsung',
      name: 'Galaxy Edge 8',
      type: 'Phone',
      serial: '12345677810',
      avatar: 'svg-1',
      description: 'It\'s a phone'
    },
    {
      manufacturer: 'Samsung',
      name: 'Galaxy Edge 9',
      type: 'Phone',
      serial: '12345677811',
      avatar: 'svg-1',
      description: 'It\'s a phone'
    },
    {
      manufacturer: 'Samsung',
      name: 'Galaxy Edge 10',
      type: 'Phone',
      serial: '12345677812',
      avatar: 'svg-1',
      description: 'It\'s a phone'
    },
    {
      manufacturer: 'Samsung',
      name: 'Galaxy Edge 11',
      type: 'Phone',
      serial: '12345677813',
      avatar: 'svg-1',
      description: 'It\'s a phone'
    }
  ];

  // Promise-based API
  return {
    loadAllUsers: function() {
      // Simulate async nature of real remote calls
      return $q.when(users);
    }
  };
}

export default ['$q', ObjectsDataService];

