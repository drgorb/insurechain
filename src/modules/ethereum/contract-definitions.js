var insurechain = {
    address: '0x7871666Bf430368f268B3a0f21F42AD422f9277b',
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
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "retailer", "type": "address"}, {"name": "insurance", "type": "address"}],
        "name": "getRequestState",
        "outputs": [{"name": "", "type": "uint8"}],
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
        "inputs": [{"name": "name", "type": "string"}, {"name": "insuranceAddress", "type": "address"}],
        "name": "createInsurance",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "index", "type": "uint256"}],
        "name": "getRetailer",
        "outputs": [{"name": "", "type": "address"}, {"name": "", "type": "string"}],
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
        "name": "RetailerStatusChanged",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "insurance", "type": "address"}, {
            "indexed": false,
            "name": "status",
            "type": "uint8"
        }],
        "name": "InsuranceStatusChanged",
        "type": "event"
    }]
};

export {insurechain}