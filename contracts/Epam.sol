pragma solidity ^0.4.2;

contract PriceCalculator {

	function getPrice(string manufacturer, string productType, uint price) constant returns(uint) {
		return price * 5 / 100;
	}
}

contract Epam {

	struct Product {
		address retailer;
		string manufacturer;
		string productType;
		address customer;
		string warrantyId;
		uint warrantyEndDate;
		uint price;
	}

	struct Claim {
		address claimant;
		uint amount;
		string serial;
	}

	address owner;
	mapping(string => Product) products;
	mapping(uint => Claim) claims;
	uint claimCount;

	PriceCalculator calculator;

	modifier ownerOnly {
		if(msg.sender != owner) {
			throw;
		}
		_;
	}

	modifier noWarranty(string serial) {
		if(!isWarrantyValid(serial)) {
			throw;
		}
		_;
	}

	function Epam() {
		owner = msg.sender;
	}

	function updateCalculator(address contractAddress) ownerOnly {
		calculator = PriceCalculator(contractAddress);
	}

	function requestWarranty(string serial, address customer, uint endDate, uint price) noWarranty(serial) {
		Product product;
		product.retailer = msg.sender;
		product.customer = customer;
		product.warrantyEndDate = endDate;
		product.price = price;

		products[serial] = product;
	}

	function claimWaranty(string serial, uint amount) {
		Claim claim;
		claim.claimant = msg.sender;
		claim.amount = amount;
		claim.serial = serial;
		claims[claimCount++] = claim;
	}

	function isWarrantyValid(string serial) constant returns (bool) {
		return products[serial].warrantyEndDate < now;
	}

	function getEndDate(string serial) constant returns (uint) {
		return products[serial].warrantyEndDate;
	}

	function getCustomer(string serial) constant returns (address) {
		return products[serial].customer;
	}

}