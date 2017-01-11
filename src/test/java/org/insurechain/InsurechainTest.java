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
    private final EthAccount insuranceAccountA = from("insuranceAccountA");
    private final EthAccount insuranceAccountB = from("insuranceAccountB");
    private final EthAccount retailerAccount = from("retailerAccount");
    private EthereumFacade ethereum;
    private SoliditySource soliditySource = SoliditySource.from(new File("contracts/ContractDefinitions.sol"));

    private Insurechain insureChainAdmin;
    private Insurechain insureChainInsuranceA;
    private Insurechain insureChainInsuranceB;
    private Insurechain insureChainRetailer;

    private InsuranceManager insuranceManagerAdmin;
    private InsuranceManager insuranceManagerInsuranceA;
    private InsuranceManager insuranceManagerInsuranceB;

    private RetailerManager retailerManagerInsuranceA;
    private RetailerManager retailerManagerInsuranceB;
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
                .initialBalance(insuranceAccountA, ether(1000000000))
                .initialBalance(insuranceAccountB, ether(1000000000))
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

        insureChainInsuranceA = insurechainContractBuilder.forAccount(insuranceAccountA);
        insureChainInsuranceB = insurechainContractBuilder.forAccount(insuranceAccountB);
        insureChainRetailer = insurechainContractBuilder.forAccount(retailerAccount);

        insuranceManagerAdmin = insuranceManagerContractBuilder.forAccount(mainAccount);
        insuranceManagerInsuranceA = insuranceManagerContractBuilder.forAccount(insuranceAccountA);
        insuranceManagerInsuranceB = insuranceManagerContractBuilder.forAccount(insuranceAccountB);

        RetailerManager retailerManagerAdmin = retailerManagerContractBuilder.forAccount(mainAccount);
        retailerManagerAdmin.setSubContractAddresses(insuranceManagerAddress);

        retailerManagerInsuranceA = retailerManagerContractBuilder.forAccount(insuranceAccountA);
        retailerManagerInsuranceB = retailerManagerContractBuilder.forAccount(insuranceAccountB);
        retailerManagerRetailer = retailerManagerContractBuilder.forAccount(retailerAccount);
    }

    @Test
    public void contractTest() throws ExecutionException, InterruptedException, IOException {
        assertFalse(mainAccount.equals(insuranceAccountA));
        assertFalse(mainAccount.equals(retailerAccount));
        assertFalse(insuranceAccountA.equals(retailerAccount));

        EthAddress priceCalculatorAddress = ethereum.publishContract(soliditySource, "PriceCalculator",
                mainAccount).get();

        PriceCalculator priceCalculator = ethereum.createContractProxy(soliditySource, "PriceCalculator", priceCalculatorAddress,mainAccount, PriceCalculator.class);

        Date startDate = Date.from(LocalDate.of(2016, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));
        Date endDate = Date.from(LocalDate.of(2020, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));

        priceCalculator.getWarrantyPrice("",startDate, endDate, 4000);

        assertEquals(RegistrationState.Undefined, retailerManagerRetailer.getRequestState(retailerAccount, insuranceAccountA));
        assertEquals(mainAccount.getAddress(), insureChainAdmin.getOwner());

        /*first register and approve an insurance*/
        insuranceManagerInsuranceA.createInsurance("Zurich", priceCalculatorAddress).get();
        Assert.assertEquals(1L, insuranceManagerInsuranceA.insuranceCount().longValue());

        insuranceManagerInsuranceB.createInsurance("Alianz", priceCalculatorAddress).get();
        Assert.assertEquals(2L, insuranceManagerInsuranceB.insuranceCount().longValue());

        /*now check that the retailer can not request membership of an unapproved insurance*/
        try {
            retailerManagerRetailer.requestRegistration("a company name", insuranceAccountA).get();
            fail("the call should throw an exception");
        } catch (ExecutionException e) {
            Assert.assertEquals(EthereumApiException.class, e.getCause().getClass());
        }

        /*the owner approves both insurances creation*/
        insuranceManagerAdmin.setInsuranceState(insuranceAccountA, InsuranceStatus.Active).get();
        insuranceManagerAdmin.setInsuranceState(insuranceAccountB, InsuranceStatus.Active).get();

        InsuranceStruct returnValues = new InsuranceStruct("Zurich", insuranceAccountA.getAddress(), InsuranceStatus.Active.ordinal());
        Assert.assertEquals(true, returnValues.equals(insuranceManagerInsuranceA.getInsurance(0)));

        /*the registration request should pass now*/
        Assert.assertEquals(InsuranceStatus.Active, insuranceManagerInsuranceA.getInsuranceStatus(insuranceAccountA));
        Assert.assertTrue(retailerManagerRetailer.isInsurance(insuranceAccountA));
        retailerManagerRetailer.requestRegistration("a company name", insuranceAccountA).get();
        /*there is one retailer in the list now*/
        Assert.assertEquals(1L, retailerManagerRetailer.retailerCount().longValue());
        /*and the state of the request is pending approval*/
        assertEquals(RegistrationState.Requested, retailerManagerRetailer.getRequestState(retailerAccount, insuranceAccountA));

        /*now do the same for InsuranceB*/
        retailerManagerRetailer.requestRegistration("a company name", insuranceAccountB).get();
        /*there is still only one retailer in the list*/
        Assert.assertEquals(1L, retailerManagerRetailer.retailerCount().longValue());
        /*and the state of the request is pending approval*/
        assertEquals(RegistrationState.Requested, retailerManagerRetailer.getRequestState(retailerAccount, insuranceAccountB));

        /*the insurer approves the registration request*/
        retailerManagerInsuranceA.setRequestState(retailerAccount, RegistrationState.Accepted).get();
        assertEquals(RegistrationState.Accepted, retailerManagerInsuranceA.getRequestState(retailerAccount, insuranceAccountA));

        assertTrue((new RetailerStruct(retailerAccount.getAddress(), "a company name", RetailerStatus.Accepted, RetailerStatus.Accepted))
                .equals(retailerManagerInsuranceA.getRetailer(0, insuranceAccountA)));
        assertTrue((new RetailerStruct(retailerAccount.getAddress(), "a company name", RetailerStatus.Accepted, RetailerStatus.Accepted))
                .equals(retailerManagerInsuranceA.getRetailerByAddress(retailerAccount, insuranceAccountA)));

        assertEquals(UserRole.Owner, insureChainAdmin.getRole(mainAccount));
        assertEquals(UserRole.Insurance, insureChainAdmin.getRole(insuranceAccountA));
        assertEquals(UserRole.Retailer, insureChainAdmin.getRole(retailerAccount));

        Integer warrantyPrice = insureChainRetailer.getWarrantyQuote("productId", insuranceAccountA, startDate,
                endDate, 4000);
        assertEquals(Integer.valueOf(4000 * 5 / 100 * 4), warrantyPrice);
        insureChainRetailer.createWarranty("productId", "serialNumber", insuranceAccountA, startDate,
                endDate, 4000).get();
        assertEquals(1, insureChainRetailer.warrantyCount().intValue());

        insureChainRetailer.createWarranty("productId", "serialNumber2", insuranceAccountA, startDate,
                endDate, 4000).get();
        assertEquals(2, insureChainRetailer.warrantyCount().intValue());

        insureChainInsuranceA.confirmWarranty("productId", "serialNumber",
                "policyNumber").get();
        insureChainInsuranceA.confirmWarranty("productId", "serialNumber2",
                "policyNumber2").get();

        assertEquals(new Warranty(startDate, endDate, WarrantyStatus.Confirmed, "policyNumber", warrantyPrice, 0),
                insureChainAdmin.getWarranty("productId", "serialNumber", insuranceAccountA));

        assertEquals(new Warranty(startDate, endDate, WarrantyStatus.Confirmed, "policyNumber2", warrantyPrice, 0),
                insureChainAdmin.getWarranty("productId", "serialNumber2", insuranceAccountA));

        assertTrue(insureChainAdmin.isRegisteredRetailer(insuranceAccountA, retailerAccount));
        assertTrue(insureChainAdmin.isWarrantyValid(insuranceAccountA, "productId", "serialNumber"));

        insureChainRetailer.createClaim("productId", "serialNumber", insuranceAccountA, 200,
                "replace device").get();

        assertEquals(new Claim(retailerAccount.getAddress(), 200, "replace device"),
                insureChainRetailer.getClaim("productId", "serialNumber", insuranceAccountA, 0));

        assertEquals(new Warranty(startDate, endDate, WarrantyStatus.Confirmed, "policyNumber", warrantyPrice, 1),
                insureChainAdmin.getWarranty("productId", "serialNumber", insuranceAccountA));

        try{
            insureChainRetailer.cancelWarranty("productId", "serialNumber", insuranceAccountA).get();
            fail("no exception for canceled warranty");
        } catch (Exception e){
            /*everything OK*/
        }

    }
}
