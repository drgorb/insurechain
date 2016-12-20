/**
 * Objects DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function IpfsApiService($q) {

    return {
        ipfs: window.IpfsApi('localhost', '5001')
    };
}

export default ['$q', IpfsApiService];