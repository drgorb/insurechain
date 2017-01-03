let insurechain = {abi:[{"outputs":[],"constant":false,"payable":false,"inputs":[{"name":"productId","type":"string"},{"name":"serialNumber","type":"string"}],"name":"cancelWarranty","type":"function"},{"outputs":[{"name":"startDate","type":"uint256"},{"name":"endDate","type":"uint256"},{"name":"status","type":"uint8"},{"name":"policyNumber","type":"string"}],"constant":true,"payable":false,"inputs":[{"name":"productId","type":"string"},{"name":"serialNumber","type":"string"},{"name":"insurance","type":"address"}],"name":"getWarranty","type":"function"},{"outputs":[],"constant":false,"payable":false,"inputs":[{"name":"name","type":"string"}],"name":"createInsurance","type":"function"},{"outputs":[],"constant":false,"payable":false,"inputs":[{"name":"retailer","type":"address"},{"name":"status","type":"uint8"}],"name":"setRequestState","type":"function"},{"outputs":[],"constant":false,"payable":false,"inputs":[{"name":"companyName","type":"string"},{"name":"insurance","type":"address"}],"name":"requestRegistration","type":"function"},{"outputs":[{"name":"","type":"uint8"}],"constant":true,"payable":false,"inputs":[{"name":"retailer","type":"address"},{"name":"insurance","type":"address"}],"name":"getRequestState","type":"function"},{"outputs":[],"constant":false,"payable":false,"inputs":[{"name":"productId","type":"string"},{"name":"serialNumber","type":"string"},{"name":"insurance","type":"address"},{"name":"startDate","type":"uint256"},{"name":"endDate","type":"uint256"},{"name":"price","type":"uint256"}],"name":"createWarranty","type":"function"},{"outputs":[],"constant":false,"payable":false,"inputs":[],"name":"kill","type":"function"},{"outputs":[{"name":"","type":"uint8"}],"constant":true,"payable":false,"inputs":[{"name":"user","type":"address"}],"name":"getRole","type":"function"},{"outputs":[{"name":"","type":"uint256"}],"constant":true,"payable":false,"inputs":[],"name":"retailerCount","type":"function"},{"outputs":[{"name":"","type":"uint256"}],"constant":true,"payable":false,"inputs":[],"name":"insuranceCount","type":"function"},{"outputs":[],"constant":false,"payable":false,"inputs":[{"name":"insuranceAddress","type":"address"},{"name":"status","type":"uint8"}],"name":"setInsuranceState","type":"function"},{"outputs":[{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"uint8"}],"constant":true,"payable":false,"inputs":[{"name":"index","type":"uint256"}],"name":"getInsurance","type":"function"},{"outputs":[{"name":"","type":"address"}],"constant":true,"payable":false,"inputs":[],"name":"getOwner","type":"function"},{"outputs":[{"name":"","type":"address"},{"name":"","type":"string"}],"constant":true,"payable":false,"inputs":[{"name":"index","type":"uint256"}],"name":"getRetailer","type":"function"},{"outputs":[{"name":"","type":"bool"}],"constant":true,"payable":false,"inputs":[{"name":"insurance","type":"address"}],"name":"isInsurance","type":"function"},{"outputs":[],"constant":false,"payable":false,"inputs":[{"name":"productId","type":"string"},{"name":"serialNumber","type":"string"},{"name":"policyNumber","type":"string"}],"name":"confirmWarranty","type":"function"},{"inputs":[{"indexed":true,"name":"companyName","type":"string"},{"indexed":false,"name":"retailerAddress","type":"address"},{"indexed":true,"name":"insurance","type":"address"}],"name":"RetailerRequest","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"retailer","type":"address"},{"indexed":true,"name":"insurance","type":"address"},{"indexed":false,"name":"status","type":"uint8"}],"name":"RetailerStatusChanged","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"insurance","type":"address"},{"indexed":false,"name":"status","type":"uint8"}],"name":"InsuranceStatusChanged","anonymous":false,"type":"event"}], address: "0xe9c9294247452df68c155343fc89c307ad35c92f"}; export {insurechain}