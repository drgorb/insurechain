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
    private SoliditySource soliditySource = SoliditySource.from(new File("contracts/ContractDefinitions.sol"));

    private Insurechain insureChainAdmin;
    private Insurechain insureChainInsurance;
    private Insurechain insureChainRetailer;

    private InsuranceManager insuranceManagerAdmin;
    private InsuranceManager insuranceManagerInsurance;

    private RetailerManager retailerManagerInsurance;
    private RetailerManager retailerManagerRetailer;


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
                .initialBalance(mainAccount, ether(1000000000))
                .initialBalance(insuranceAccount, ether(1000000000))
                .initialBalance(retailerAccount, ether(1000000000))
        );
        // add contracts to publish
        EthAddress insuranceManagerAddress = ethereum.publishContract(soliditySource, "InsuranceManager",
                mainAccount).get();
        EthAddress retailermanagerAddress = ethereum.publishContract(soliditySource, "RetailerManager",
                mainAccount).get();
        EthAddress insureChainAddress = ethereum.publishContract(soliditySource, "Insurechain",
                mainAccount).get();

        EthereumFacade.Builder<Insurechain> insurechainContractBuilder =
                ethereum.createContractProxy(soliditySource, "Insurechain", insureChainAddress, Insurechain.class);
        EthereumFacade.Builder<InsuranceManager> insuranceManagerContractBuilder =
                ethereum.createContractProxy(soliditySource, "InsuranceManager", insuranceManagerAddress, InsuranceManager.class);
        EthereumFacade.Builder<RetailerManager> retailerManagerContractBuilder =
                ethereum.createContractProxy(soliditySource, "RetailerManager", retailermanagerAddress, RetailerManager.class);

        insureChainAdmin = insurechainContractBuilder.forAccount(mainAccount);
        insureChainAdmin.setSubContractAddresses(insuranceManagerAddress, retailermanagerAddress);

        insureChainInsurance = insurechainContractBuilder.forAccount(insuranceAccount);
        insureChainRetailer = insurechainContractBuilder.forAccount(retailerAccount);

        insuranceManagerAdmin = insuranceManagerContractBuilder.forAccount(mainAccount);
        insuranceManagerInsurance = insuranceManagerContractBuilder.forAccount(insuranceAccount);

        RetailerManager retailerManagerAdmin = retailerManagerContractBuilder.forAccount(mainAccount);
        retailerManagerAdmin.setSubContractAddresses(insuranceManagerAddress);

        retailerManagerInsurance = retailerManagerContractBuilder.forAccount(insuranceAccount);
        retailerManagerRetailer = retailerManagerContractBuilder.forAccount(retailerAccount);
    }

    @Test
    public void contractTest() throws ExecutionException, InterruptedException, IOException {
        assertFalse(mainAccount.equals(insuranceAccount));
        assertFalse(mainAccount.equals(retailerAccount));
        assertFalse(insuranceAccount.equals(retailerAccount));

        EthAddress priceCalculatorAddress = ethereum.publishContract(soliditySource, "PriceCalculator",
                mainAccount).get();

        assertEquals(RegistrationState.Undefined, retailerManagerRetailer.getRequestState(retailerAccount, insuranceAccount));
        assertEquals(mainAccount.getAddress(), insureChainAdmin.getOwner());

        /*first register and approve an insurance*/
        insuranceManagerInsurance.createInsurance("Zurich", priceCalculatorAddress).get();
        Assert.assertEquals(1L, insuranceManagerInsurance.insuranceCount().longValue());

        /*now check that the retailer can not request membership of an unapproved insurance*/
        try {
            retailerManagerRetailer.requestRegistration("a company name", insuranceAccount).get();
            fail("the call should throw an exception");
        } catch (ExecutionException e) {
            Assert.assertEquals(EthereumApiException.class, e.getCause().getClass());
        }

        /*the owner approves the insurance creation*/
        insuranceManagerAdmin.setInsuranceState(insuranceAccount, InsuranceStatus.Active).get();
        InsuranceStruct returnValues = new InsuranceStruct("Zurich", insuranceAccount.getAddress(), InsuranceStatus.Active.ordinal());
        Assert.assertEquals(true, returnValues.equals(insuranceManagerInsurance.getInsurance(0)));

        /*the registration request should pass now*/
        Assert.assertEquals(InsuranceStatus.Active, insuranceManagerInsurance.getInsuranceStatus(insuranceAccount));
        Assert.assertTrue(retailerManagerRetailer.isInsurance(insuranceAccount));
        retailerManagerRetailer.requestRegistration("a company name", insuranceAccount).get();
        /*there is one retailer in the list now*/
        Assert.assertEquals(1L, retailerManagerRetailer.retailerCount().longValue());
        /*and the state of the request is pending approval*/
        assertEquals(RegistrationState.Requested, retailerManagerRetailer.getRequestState(retailerAccount, insuranceAccount));

        /*the insurer approves the registration request*/
        retailerManagerInsurance.setRequestState(retailerAccount, RegistrationState.Accepted).get();
        assertEquals(RegistrationState.Accepted, retailerManagerInsurance.getRequestState(retailerAccount, insuranceAccount));

        assertTrue((new RetailerStruct(retailerAccount.getAddress(), "a company name", RetailerStatus.Accepted, RetailerStatus.Accepted))
                .equals(retailerManagerInsurance.getRetailer(0, insuranceAccount )));
        assertTrue((new RetailerStruct(retailerAccount.getAddress(), "a company name", RetailerStatus.Accepted, RetailerStatus.Accepted))
                .equals(retailerManagerInsurance.getRetailerByAddress(retailerAccount, insuranceAccount)));

        assertEquals(UserRole.Owner, insureChainAdmin.getRole(mainAccount));
        assertEquals(UserRole.Insurance, insureChainAdmin.getRole(insuranceAccount));
        assertEquals(UserRole.Retailer, insureChainAdmin.getRole(retailerAccount));

        Date startDate = Date.from(LocalDate.of(2016, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));
        Date endDate = Date.from(LocalDate.of(2020, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));
        Integer warrantyPrice = insureChainRetailer.getWarrantyQuote("productId", insuranceAccount, startDate,
                endDate, 4000);
        insureChainRetailer.createWarranty("productId", "serialNumber", insuranceAccount, startDate,
                endDate, 4000).get();
        insureChainInsurance.confirmWarranty("productId", "serialNumber",
                "policyNumber").get();
        assertEquals(new Warranty(startDate, endDate, WarrantyStatus.Confirmed, "policyNumber", warrantyPrice, 0),
                insureChainAdmin.getWarranty("productId", "serialNumber", insuranceAccount));

        assertTrue(insureChainAdmin.isRegisteredRetailer(insuranceAccount, retailerAccount));
        assertTrue(insureChainAdmin.isWarrantyValid(insuranceAccount, "productId", "serialNumber"));
        insureChainRetailer.createClaim("productId", "serialNumber", insuranceAccount, 200,
                "replace device").get();
        assertEquals(new Claim(retailerAccount.getAddress(), 200, "replace device"),
                insureChainRetailer.getClaim("productId", "serialNumber", insuranceAccount, 0));
        assertEquals(new Warranty(startDate, endDate, WarrantyStatus.Confirmed, "policyNumber", warrantyPrice, 1),
                insureChainAdmin.getWarranty("productId", "serialNumber", insuranceAccount));

        try{
            insureChainRetailer.cancelWarranty("productId", "serialNumber", insuranceAccount).get();
            fail("no exception for canceled warranty");
        } catch (Exception e){
            /*everything OK*/
        }

    }
}
