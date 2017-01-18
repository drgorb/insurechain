/**
 * Objects DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
import FileSaver from "file-saver";

function FileSaverService($q) {

    return FileSaver;
}

export default ['$q', FileSaverService];