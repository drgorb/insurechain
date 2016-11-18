# running a hackathon chain to have a team chain to work on

## seting up the chain

* install geth: https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum
* create a folder like `~/hackathon`
* copy the file `genesis.json` into that folder
* run `geth --datadir ~/.ethereum/hackathon init ~/genesis.json`
* verify that everithing went fine: you should have a message saying `successfully wrote genesis ...`

### running the chain and mining some ether

now you can run your actual chain and create an account. We will run this chain on a different port to avoid conflicts with Mist or any other running geth  

* `geth --datadir ~/.ethereum/hackathon --networkid 42 --port 30304 console 2>>hackathon-geth.log`
* on the console enter `personal.newAccount()` and give it a schort insecure password. It is more important to be easy to type than secure. The coins here have no value anyways.
* ask your geth admin to send you some ETH to this account. 
* Alternatively you can start mining by typing `miner.start()` in the console
* geth will start generating a DAG. This can take some time
* once it is done you will get ETH fairly quickly

### joining the network

until now you are alone as you have no peers as shown by the result of `admin.peers` on the console.

* on the console type `admin.addPeer("enode://ef6339105a41f74e14f315e69e19f0e603e026539b70f341eced15a07d08246d5a7f4b2aad226c7f5a9637cc841ac7f0cc6a277a6b73461c53b2bd8968f330c8@geth.mngn.io:30304")`

## TestRPC

We can use (TestRPC)[https://github.com/ethereumjs/testrpc] for development. Install with 

    npm install -g ethereumjs-testrpc

And then launch it with some predefined accounts and balances:

    testrpc --account="0x320cb348c48c36cfe2a2b6fd2ac48a001ba8c9e828a40c3f985536708e1639a9,2000000000000000000" \
    --account="0xfd330a56a8d498fdd2c4efd22f9146c343a995b95a83a31d2fdd00af696a7e6c,2000000000000000000" \
    --account="0xee06b5987a0e0d7fd8567a0d337b8e4944e635b40e293c4a6492ed8c87d41ae0,2000000000000000000" 