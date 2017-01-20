package org.insurechain;


import org.adridadou.ethereum.EthereumFacade;
import org.adridadou.ethereum.provider.EthereumFacadeProvider;
import org.adridadou.ethereum.provider.EthereumJConfigs;
import org.adridadou.ethereum.values.*;
import org.apache.commons.io.IOUtils;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import static com.google.common.collect.Lists.newArrayList;
import static org.adridadou.ethereum.keystore.AccountProvider.fromPrivateKey;
import static org.junit.Assert.assertEquals;

/**
 * Created by davidroon on 30.12.16.
 */
public class PublishAndSetup {

    private final SoliditySource soliditySource = SoliditySource.from(new File("contracts/ContractDefinitions.sol"));

    private final EthereumFacadeProvider.Builder provider = EthereumFacadeProvider
            .forNetwork(EthereumJConfigs.ropsten());

    private final EthAccount owner = fromPrivateKey("fddf7aa492fdcfb7c39ad728fc5a5139a68d194dd56b40a35cfa361627a9cf8a");
    private final EthAccount alianz = fromPrivateKey("cab468af941365618e45836e3c4e08f53a330c87c37941f011f68ba3d448c47b");
    private final EthAccount zurich = fromPrivateKey("26159a4da193a61993b747a845f8f688db987dc681b9e0b8105c0456acc47f6b");
    private final EthAccount mobiliere = fromPrivateKey("e1815424842d37116c336c65f55a6314955c928e132c89cecb2e8e2246ae8ed0");
    private final EthAccount digitec = fromPrivateKey("7952218f38b62b43c59d2e3945bc8ef611d310f4a4c022f2448e8f64aa0daaad");
    private final EthAccount interdiscount = fromPrivateKey("21a0016ac3d43606dfb7b2b728ed21979bdf70896ddd719f66a0ba0227fa9473");
    private final EthAccount melectronics = fromPrivateKey("06ae93d8c283f7c00c6549fe708026db6a5aeeb6b5b87804dd0cc4b03010c43e");
    private EthAddress priceCalculatorAddress;


    private final List<EthAccount> insurances = newArrayList(alianz, zurich, mobiliere);
    private final List<EthAccount> retailers = newArrayList(digitec, interdiscount, melectronics);

    private class Contracts {
        public Insurechain ic;
        public InsuranceManager im;
        public RetailerManager rm;

        public Contracts(Insurechain ic, InsuranceManager im, RetailerManager rm) {
            this.ic = ic;
            this.im = im;
            this.rm = rm;
        }
    }

    private final Map<EthAccount, Contracts> contract = new HashMap<>();
    private EthereumFacade ethereum;

    @Test
    public void test() throws ExecutionException, InterruptedException, IOException {
        printBalances();
        initContractInterfaces();
        initInsurances();
        initRetailers(zurich);
        initRetailers(mobiliere);
        initRetailers(alianz);
        createWarranties();
        createClaims();

        assertEquals(RegistrationState.Accepted, contract.get(zurich).rm.getRequestState(digitec,zurich));

        Date startDate = Date.from(LocalDate.of(2017, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));
        Date endDate = Date.from(LocalDate.of(2020, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));

        contract.get(digitec).ic.createWarranty("ean13", "productsn", zurich, startDate, endDate, 4000);
        contract.get(zurich).ic.confirmWarranty("ean13", "productsn", "policyNumber");

    }

    private void p(EthAccount account) {
        System.out.println("balance for " + account.getAddress().withLeading0x() + ":" + ethereum.getBalance(account).inEth().toString() + " Eth");
    }

    private void printBalances() {
        p(owner);
        p(alianz);
        p(zurich);
        p(mobiliere);
        p(digitec);
        p(interdiscount);
        p(melectronics);
    }

    @Before
    public void before() {
        provider.extendConfig().fastSync(false);
        ethereum = provider.create();
    }

    private void createWarranties() throws ExecutionException, InterruptedException {
        Date startDate = Date.from(LocalDate.of(2016, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));
        Date endDate = Date.from(LocalDate.of(2020, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));

        newArrayList(contract.get(digitec).ic.createWarranty("0711730346183", "iPhone6SerialNumber1", zurich, startDate,
                endDate, 4000),
        contract.get(digitec).ic.createWarranty("0711730346183", "iPhone6SerialNumber2", alianz, startDate,
                endDate, 4000),
        contract.get(interdiscount).ic.createWarranty("0711730346183", "iPhone6SerialNumber3", mobiliere, startDate,
                endDate, 4000),
        contract.get(interdiscount).ic.createWarranty("0711730346183", "iPhone6SerialNumber4", zurich, startDate,
                endDate, 4000),
        contract.get(melectronics).ic.createWarranty("0711730346183", "iPhone6SerialNumber5", alianz, startDate,
                endDate, 4000),
        contract.get(melectronics).ic.createWarranty("0711730346183", "iPhone6SerialNumber6", mobiliere, startDate,
                endDate, 4000)).forEach(waitForFuture);

        newArrayList(contract.get(zurich).ic.confirmWarranty("0711730346183", "iPhone6SerialNumber1", "iPhone6SerialNumber1Zurich"),
        contract.get(alianz).ic.confirmWarranty("0711730346183", "iPhone6SerialNumber2", "iPhone6SerialNumber2Alianz"),
        contract.get(mobiliere).ic.confirmWarranty("0711730346183", "iPhone6SerialNumber3", "iPhone6SerialNumber3Mobiliere"),
        contract.get(zurich).ic.confirmWarranty("0711730346183", "iPhone6SerialNumber4", "iPhone6SerialNumber4Zurich"),
        contract.get(alianz).ic.confirmWarranty("0711730346183", "iPhone6SerialNumber5", "iPhone6SerialNumber5Alianz"),
        contract.get(mobiliere).ic.confirmWarranty("0711730346183", "iPhone6SerialNumber6", "iPhone6SerialNumber6Mobiliere")).forEach(waitForFuture);
    }

    private void createClaims() throws ExecutionException, InterruptedException {
        newArrayList(contract.get(digitec).ic.createClaim("0711730346183", "iPhone6SerialNumber1", zurich,
                500, "replace screen"),
        contract.get(interdiscount).ic.createClaim("0711730346183", "iPhone6SerialNumber3", mobiliere,
                2000, "replace phone"),
        contract.get(melectronics).ic.createClaim("0711730346183", "iPhone6SerialNumber5", alianz,
                800, "replace battery")).forEach(waitForFuture);
    }

    private void initRetailers(EthAccount insurance) {
        newArrayList(
                contract.get(digitec).rm.requestRegistration("Digitec", insurance),
                contract.get(interdiscount).rm.requestRegistration("Interdiscount", insurance),
                contract.get(melectronics).rm.requestRegistration("Melectronics", insurance))
                .forEach(waitForFuture);

        retailers.stream().map(retailer ->
            contract.get(insurance).rm.setRequestState(retailer, RegistrationState.Accepted))
            .forEach(waitForFuture);
    }

    private void initInsurances() {
        newArrayList(contract.get(zurich).im.createInsurance("Zurich", priceCalculatorAddress),
                contract.get(alianz).im.createInsurance("Alianz", priceCalculatorAddress),
                contract.get(mobiliere).im.createInsurance("Mobiliere", priceCalculatorAddress))
                .forEach(waitForFuture);

        insurances.stream().map(insurance -> contract.get(owner).im
                .setInsuranceState(insurance, InsuranceStatus.Active)).collect(Collectors.toList())
                .forEach(waitForFuture);
    }

    private void initContractInterfaces() throws InterruptedException, ExecutionException, IOException {
        CompiledContract insuranceManager = ethereum.compile(soliditySource,"InsuranceManager");
        CompiledContract retailerManager = ethereum.compile(soliditySource, "RetailerManager");
        CompiledContract insurechain = ethereum.compile(soliditySource,"Insurechain");
        CompiledContract priceCalculator = ethereum.compile(soliditySource,"PriceCalculator");

        EthAddress imContractAddress = ethereum.publishContract(insuranceManager,
                owner).get();
        EthAddress rmContractAddress = ethereum.publishContract(retailerManager,
                owner, imContractAddress).get();
        EthAddress icContractAddress = ethereum.publishContract(insurechain,
                owner, imContractAddress, rmContractAddress).get();
        priceCalculatorAddress = ethereum.publishContract(priceCalculator,
                owner).get();

        String icJson = getJson(icContractAddress, "insureChain", insurechain.getAbi());
        String imJson = getJson(imContractAddress, "insuranceManager", insuranceManager.getAbi());
        String rmJson = getJson(rmContractAddress, "retailerManager", retailerManager.getAbi());

        String definitions = icJson + "\n" + imJson + "\n" + rmJson + "\n";

        FileOutputStream contractDefinitions = new FileOutputStream(new File("src/app/contractDefinitions.js"));
        IOUtils.write(definitions + "export {insureChain, insuranceManager, retailerManager};"
                , contractDefinitions, StandardCharsets.UTF_8);

        EthereumFacade.Builder<Insurechain> icContractBuilder = ethereum.createContractProxy(insurechain, icContractAddress, Insurechain.class);
        EthereumFacade.Builder<InsuranceManager> imContractBuilder = ethereum.createContractProxy(insuranceManager,imContractAddress, InsuranceManager.class);
        EthereumFacade.Builder<RetailerManager> rmContractBuilder = ethereum.createContractProxy(retailerManager,rmContractAddress, RetailerManager.class);

        contract.put(owner, new Contracts(icContractBuilder.forAccount(owner),
                imContractBuilder.forAccount(owner),
                rmContractBuilder.forAccount(owner)));

        insurances.forEach(insurance -> contract.put(insurance, new Contracts(icContractBuilder.forAccount(insurance),
                imContractBuilder.forAccount(insurance),
                rmContractBuilder.forAccount(insurance))));
        retailers.forEach(retailer -> contract.put(retailer, new Contracts(icContractBuilder.forAccount(retailer),
                imContractBuilder.forAccount(retailer),
                rmContractBuilder.forAccount(retailer))));
    }

    private String getJson(EthAddress contractAddress, String name, ContractAbi abi) throws IOException {
        final String json = "{address: " + "\"" + contractAddress.withLeading0x() + "\"" +
                ",abi:" + abi.getAbi() + "}";

        return "const " + name + " = " + json + ";";

    }

    private final Consumer<CompletableFuture<Void>> waitForFuture = ((CompletableFuture<Void> c) -> {
        try {
            c.get();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    });

}
