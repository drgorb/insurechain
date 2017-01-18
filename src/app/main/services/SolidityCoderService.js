/**
 * Objects DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
import SolidityCoder from "web3/lib/solidity/coder";

function SolidityCoderService($q) {

    return SolidityCoder;
}

export default ['$q', SolidityCoderService];