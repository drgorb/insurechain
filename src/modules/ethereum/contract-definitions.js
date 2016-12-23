var retailers = {
    address: '0xbff841d520241d300531baad3f65dd133a04b95a',
    abi: [{
        "constant": false,
        "inputs": [{"name": "retailer", "type": "address"}, {"name": "status", "type": "uint8"}],
        "name": "setRequestState",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "companyName", "type": "string"}, {"name": "insurance", "type": "address"}],
        "name": "requestRegistration",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "Owned",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "companyName", "type": "string"}, {
            "indexed": false,
            "name": "retailerAddress",
            "type": "address"
        }, {"indexed": true, "name": "insurance", "type": "address"}],
        "name": "RetailerRequest",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "retailer", "type": "address"}, {
            "indexed": true,
            "name": "insurance",
            "type": "address"
        }, {"indexed": false, "name": "status", "type": "uint8"}],
        "name": "StatusChanged",
        "type": "event"
    }],
    abiHash: 'd6b4a24ecb15544fc2914fcd4029abc46569024ed1f8ad83bf74efb8274a9522'
};
var insurances = {
    address: '0x53889246ba9dd9776bcb61acb9991435072929fc',
    abi: [{
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {"constant": false, "inputs": [], "name": "Owned", "outputs": [], "payable": false, "type": "function"}],
    abiHash: '05aeafc9c5c8403945b8426c0837b3a5b9213a1ad5b87db85a03a25337a2f9ff'
};
export {retailers, insurances}