package org.insurechain;

import org.adridadou.ethereum.EthereumFacade;
import org.adridadou.ethereum.provider.PrivateEthereumFacadeProvider;
import org.adridadou.ethereum.provider.PrivateNetworkConfig;
import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;
import org.adridadou.ethereum.values.SoliditySource;
import org.adridadou.exception.EthereumApiException;
import org.junit.*;
import org.junit.rules.ExpectedException;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.concurrent.ExecutionException;

import static org.adridadou.ethereum.keystore.AccountProvider.from;
import static org.adridadou.ethereum.values.EthValue.ether;
import static org.junit.Assert.*;

/**
 * Created by davidroon on 21.12.16.
 * This code is released under Apache 2 license
 */
public class InsurechainTest {

    private final EthAccount mainAccount = from("mainAccount");
    private final EthAccount insuranceAccount = from("insuranceAccount");
    private final EthAccount retailerAccount = from("retailerAccount");
    private EthereumFacade ethereum;
    private SoliditySource soliditySource = SoliditySource.from(new File("contracts/Insurechain.sol"));
    private Insurechain insureChainContractFromAdmin;
    private Insurechain insureChainContractFromInsurance;
    private Insurechain insureChainContractFromRetailer;

    @Rule
    public final ExpectedException exception = ExpectedException.none();

    public InsurechainTest() throws Exception {
    }

    @After
    public void after() {
        ethereum.shutdown();
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
        EthAddress contractAddress = ethereum.publishContract(soliditySource, "Insurechain", mainAccount).get();
        EthereumFacade.Builder<Insurechain> contractBuilder = ethereum.createContractProxy(contractAddress, Insurechain.class);
        insureChainContractFromAdmin = contractBuilder.forAccount(mainAccount);
        insureChainContractFromInsurance = contractBuilder.forAccount(insuranceAccount);
        insureChainContractFromRetailer = contractBuilder.forAccount(retailerAccount);
    }

    @Test
    public void contractTest() throws ExecutionException, InterruptedException, IOException {
        assertFalse(mainAccount.equals(insuranceAccount));
        assertFalse(mainAccount.equals(retailerAccount));
        assertFalse(insuranceAccount.equals(retailerAccount));

        assertEquals(RegistrationState.Undefined, insureChainContractFromAdmin.getRequestState(retailerAccount, insuranceAccount));
        assertEquals(mainAccount.getAddress(), insureChainContractFromAdmin.getOwner());

        /*first register and approve an insurance*/
        insureChainContractFromInsurance.createInsurance("Zurich").get();
        Assert.assertEquals(1L, insureChainContractFromRetailer.insuranceCount().longValue());

        /*now check that the retailer can not request membership of an unapproved insurance*/
        try {
            insureChainContractFromRetailer.requestRegistration("a company name", insuranceAccount).get();
            fail("the call should throw an exception");
        } catch (ExecutionException e) {
            Assert.assertEquals(EthereumApiException.class, e.getCause().getClass());
        }

        /*the owner approves the insurance creation*/
        insureChainContractFromAdmin.setInsuranceState(insuranceAccount, InsuranceStatus.Active).get();
        InsuranceStruct returnValues = new InsuranceStruct("Zurich", insuranceAccount.getAddress(), InsuranceStatus.Active.ordinal());
        Assert.assertEquals(true, returnValues.equals(insureChainContractFromInsurance.getInsurance(0)));

        /*the registration request should pass now*/
        insureChainContractFromRetailer.requestRegistration("a company name", insuranceAccount).get();
        /*there is one retailer in the list now*/
        Assert.assertEquals(1L, insureChainContractFromRetailer.retailerCount().longValue());
        /*and the state of the request is pending approval*/
        assertEquals(RegistrationState.Requested, insureChainContractFromAdmin.getRequestState(retailerAccount, insuranceAccount));

        /*the insurer approves the registration request*/
        insureChainContractFromInsurance.setRequestState(retailerAccount, RegistrationState.Accepted).get();
        assertEquals(RegistrationState.Accepted, insureChainContractFromAdmin.getRequestState(retailerAccount, insuranceAccount));

        assertTrue((new RetailerStruct(retailerAccount.getAddress(), "a company name")).equals(insureChainContractFromAdmin.getRetailer(0)));

        assertEquals(UserRole.Owner, insureChainContractFromAdmin.getRole(mainAccount));
        assertEquals(UserRole.Insurance, insureChainContractFromAdmin.getRole(insuranceAccount));
        assertEquals(UserRole.Retailer, insureChainContractFromAdmin.getRole(retailerAccount));

        Date startDate = Date.from(LocalDate.of(2016, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));
        Date endDate = Date.from(LocalDate.of(2020, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));
        insureChainContractFromRetailer.createWarranty("productId", "serialNumber", insuranceAccount, startDate, endDate, 4000).get();
        insureChainContractFromInsurance.confirmWarranty("productId", "serialNumber", "policyNumber").get();
        assertEquals(new Warranty(startDate, endDate, WarrantyStatus.Confirmed, "policyNumber"), insureChainContractFromAdmin.getWarranty("productId", "serialNumber", insuranceAccount));

        insureChainContractFromInsurance.cancelWarranty("productId", "serialNumber").get();

        assertEquals(new Warranty(startDate, endDate, WarrantyStatus.Canceled, "policyNumber"), insureChainContractFromAdmin.getWarranty("productId", "serialNumber", insuranceAccount));
    }
}
