# Extended Waranty smart-contract interface on Ethereum

[here is a screen cast of how the app works](https://youtu.be/87IiN8InU7A)

The app has been created with the following technology components:

* [Metamask wallet](metamask.io)
* Solidity contract
* Angular web frontend

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


# Test Data

## Setup

mnemonic: 
    
    current ladder reduce flat motor raise retire stuff tobacco zero cage music

### Roles 
* Owner
  * 0x6d8b18f9b737160a73f536393c908fe89961e570
* Insurance
  * Alianz: 
    * 0xc62e02ddc6c1a78ca63f144253e74c85ecb76b74
  * Zurich:
    * 0x95262f78c646178416c123dbeef2a286d41a27e8
  * Mobiliar:
    * 0x607aae63a7d99e0207214248b9f663e55b465766
* Retailers
  * Digitec:
    * 0x3b06274c18e8a188c24f64dd4793f1027c1f3123
  * Interdiscount:
    * 0xce2db460f2c86b5b66bfb2815d5ee476e61584ac
  * M-Electronics:
    * 0xb3b499b3a1f35d1b413e8fb17d0134ed11c650cc
* Others
  * David:
    * 0x7ff1dc632804fb8b3670d76a6ad6116ca62237c8
  * Lukasz:
    * 0x9fb748132a10365d386a8ad733aefb52358625d2
  * Micha:
    * 0x281eed6506013260a5915b035c857b62459bf022

