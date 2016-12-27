package org.insurechain;

import org.adridadou.ethereum.EthereumFacade;
import org.adridadou.ethereum.provider.PrivateEthereumFacadeProvider;
import org.adridadou.ethereum.provider.PrivateNetworkConfig;
import org.adridadou.ethereum.provider.StandaloneEthereumFacadeProvider;
import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;
import org.adridadou.ethereum.values.SoliditySource;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

import static org.adridadou.ethereum.values.EthValue.ether;
import static org.junit.Assert.assertEquals;

/**
 * Created by davidroon on 21.12.16.
 * This code is released under Apache 2 license
 */
public class InsurechainTest {

    private final StandaloneEthereumFacadeProvider provider = new StandaloneEthereumFacadeProvider();
    private final EthAccount mainAccount = provider.getLockedAccount("mainAccount").decode("");
    private final EthAccount insuranceAccount = provider.getLockedAccount("insuranceAccount").decode("");
    private final EthAccount retailerAccount = provider.getLockedAccount("retailerAccount").decode("");
    private EthereumFacade ethereum;
    private EthAddress contractAddress;
    private SoliditySource soliditySource = SoliditySource.from(new File("contracts/Insurechain.sol"));
    private Insurechain insureChainContractFromAdmin;
    private Insurechain insureChainContractFromInsurance;
    private Insurechain insureChainContractFromRetailer;

    public InsurechainTest() throws Exception {
    }

    @Before
    public void before() throws Exception {
        ethereum = new PrivateEthereumFacadeProvider().create(PrivateNetworkConfig.config()
                .reset(true)
                .initialBalance(mainAccount, ether(100))
                .initialBalance(insuranceAccount, ether(100))
                .initialBalance(retailerAccount, ether(100))
        );
        // add contracts to publish
        contractAddress = ethereum.publishContract(soliditySource, "Insurechain", mainAccount).get();
        insureChainContractFromAdmin = ethereum.createContractProxy(soliditySource, "Insurechain", contractAddress, mainAccount, Insurechain.class);
        insureChainContractFromInsurance = ethereum.createContractProxy(soliditySource, "Insurechain", contractAddress, insuranceAccount, Insurechain.class);
        insureChainContractFromRetailer = ethereum.createContractProxy(soliditySource, "Insurechain", contractAddress, retailerAccount, Insurechain.class);
    }

    @Test
    public void test() throws ExecutionException, InterruptedException, IOException {
        assertEquals(RegistrationState.Undefined, insureChainContractFromAdmin.getRequestState(retailerAccount, insuranceAccount));
        insureChainContractFromRetailer.requestRegistration("a company name", insuranceAccount).get();
        assertEquals(RegistrationState.Requested, insureChainContractFromAdmin.getRequestState(retailerAccount, insuranceAccount));
    }
}
