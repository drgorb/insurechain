package org.insurechain;

import org.adridadou.ethereum.EthereumFacade;
import org.adridadou.ethereum.provider.StandaloneEthereumFacadeProvider;
import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;
import org.adridadou.ethereum.values.SoliditySource;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.util.concurrent.ExecutionException;

/**
 * Created by davidroon on 21.12.16.
 * This code is released under Apache 2 license
 */
public class RetailerTest {

    private final StandaloneEthereumFacadeProvider provider = new StandaloneEthereumFacadeProvider();
    private final EthAccount mainAccount = provider.getLockedAccount("mainAccount").decode("");
    private EthereumFacade ethereum;
    private EthAddress contractAddress;
    private SoliditySource soliditySource = SoliditySource.from(new File("contracts/Retailers.sol"));

    public RetailerTest() throws Exception {
    }

    @Before
    public void before() throws ExecutionException, InterruptedException {
        EthereumFacade ethereum = provider.create();
        // add contracts to publish
        contractAddress = ethereum.publishContract(soliditySource, "Retailers", mainAccount).get();
    }

    @Test
    public void test() throws ExecutionException, InterruptedException {
        //TODO: create the interface to interact with it and then write your tests
        //Retailers retailerContract = ethereum.createContractProxy(soliditySource,"Retailers", contractAddress, mainAccount, Retailers.class);
    }
}
