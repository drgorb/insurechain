# Extended Waranty smart-contract interface on Ethereum

The web-app covers 3 use cases:

* request an extended warranty for a product
    * register a customer with her [blockone](https://blockone.thomsonreuters.com/docs/) address as identity
    * set the expiration date of the warranty contract
* open a claim for repair or replacement of the insured object
* create a list for all the claims and warranty contracts created in a specific month

the following things were left out:

* the transfer of an object to a new owner
* security of the application
* sercurity of the smart-contract
* scanning of serial numbers, QR-Codes and Barcodes to improve efficiency
* setting the warranty contract id 
* calculating the commission for the retailer - there is a PriceCalculator contract but it is not used

## Data Model in the smart-contract

There are 3 entities to hold the data:

* Product - identified by its serial number
* Request - identified by its index
* Claim - identified by it index

A product is linked to a customer and a retailer. 

The retailer is the one who makes claims. He can decide if the item should be replaced or repaired

## reporting

the reporting function is a simple CSV export of all the data in the smart contract. This is obviously not the way one would implement reporting for a real world application. But it gets the job done for the demo.

In real life, you would create an Oracle (a web app) which observes the transactions on the contract and writes them into a database for efficient analysis, reporting and inteerface with billing and contract management systems.



