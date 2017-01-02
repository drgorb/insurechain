package org.insurechain;


import com.google.common.collect.Lists;
import org.adridadou.ethereum.EthereumFacade;
import static org.adridadou.ethereum.keystore.AccountProvider.*;

import org.adridadou.ethereum.provider.EthereumFacadeProvider;
import org.adridadou.ethereum.provider.EthereumJConfigs;
import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;
import org.adridadou.ethereum.values.SoliditySource;
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

/**
 * Created by davidroon on 30.12.16.
 */
public class PublishAndSetup {
    private final EthereumFacadeProvider.Builder provider = EthereumFacadeProvider
            .forNetwork(EthereumJConfigs.ropsten());

    private final EthAccount owner = fromPrivateKey("fddf7aa492fdcfb7c39ad728fc5a5139a68d194dd56b40a35cfa361627a9cf8a");
    private final EthAccount alianz = fromPrivateKey("cab468af941365618e45836e3c4e08f53a330c87c37941f011f68ba3d448c47b");
    private final EthAccount zurich = fromPrivateKey("26159a4da193a61993b747a845f8f688db987dc681b9e0b8105c0456acc47f6b");
    private final EthAccount mobiliere = fromPrivateKey("e1815424842d37116c336c65f55a6314955c928e132c89cecb2e8e2246ae8ed0");
    private final EthAccount digitec = fromPrivateKey("7952218f38b62b43c59d2e3945bc8ef611d310f4a4c022f2448e8f64aa0daaad");
    private final EthAccount interdiscount = fromPrivateKey("21a0016ac3d43606dfb7b2b728ed21979bdf70896ddd719f66a0ba0227fa9473");
    private final EthAccount melectronics = fromPrivateKey("06ae93d8c283f7c00c6549fe708026db6a5aeeb6b5b87804dd0cc4b03010c43e");

    private final List<EthAccount> insurances = Lists.newArrayList(alianz, zurich, mobiliere);
    private final List<EthAccount> retailers = Lists.newArrayList(digitec, interdiscount, melectronics);

    private final Map<EthAccount, Insurechain> contract = new HashMap<>();
    private EthereumFacade ethereum;

    @Test
    public void test() throws ExecutionException, InterruptedException, IOException {
        printBalances();
        initContractInterfaces();
        initInsurances();
        initRetailers();

        Date startDate = Date.from(LocalDate.of(2017, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));
        Date endDate = Date.from(LocalDate.of(2020, 4, 24).atStartOfDay().toInstant(ZoneOffset.UTC));

        contract.get(digitec).createWarranty("ean13","productsn",zurich, startDate, endDate,4000);
        contract.get(zurich).confirmWarranty("ean13", "productsn", "policyNumber");

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
        provider.extendConfig().fastSync(true);
        ethereum = provider.create();
    }

    private void initRetailers() {
        Lists.newArrayList(
                contract.get(digitec).requestRegistration("Digitec", zurich),
                contract.get(interdiscount).requestRegistration("Interdiscount", zurich),
                contract.get(melectronics).requestRegistration("Melectronics", zurich));

        retailers.stream().map(retailer -> contract.get(zurich).setRequestState(retailer, RegistrationState.Accepted))
                .collect(Collectors.toList())
                .forEach(waitForFuture);
    }

    private void initInsurances() {
        Lists.newArrayList(contract.get(zurich).createInsurance("Zurich"),
        contract.get(alianz).createInsurance("Alianz"),
        contract.get(mobiliere).createInsurance("mobiliere")).forEach(waitForFuture);

        insurances.stream().map(insurance -> contract.get(owner).setInsuranceState(insurance, InsuranceStatus.Active)).collect(Collectors.toList())
                .forEach(waitForFuture);
    }

    private void initContractInterfaces() throws InterruptedException, ExecutionException, IOException {
        EthAddress contractAddress = ethereum.publishContract(SoliditySource.from(new File("contracts/Insurechain.sol")), "Insurechain", owner).get();
        writeToFile(contractAddress);
        EthereumFacade.Builder<Insurechain> contractBuilder = ethereum.createContractProxy(contractAddress, Insurechain.class);
        contract.put(owner,contractBuilder.forAccount(owner));
        insurances.forEach(insurance -> contract.put(insurance, contractBuilder.forAccount(insurance)));
        retailers.forEach(retailer -> contract.put(retailer, contractBuilder.forAccount(retailer)));
    }

    private void writeToFile(EthAddress contractAddress) throws IOException {
        FileOutputStream addressStream = new FileOutputStream(new File("insurechain.address"));
        FileOutputStream abiStream = new FileOutputStream(new File("insurechain.abi"));
        IOUtils.write(ethereum.getAbi(contractAddress).getAbi(), abiStream, StandardCharsets.UTF_8);
        IOUtils.write(contractAddress.withLeading0x(), addressStream, StandardCharsets.UTF_8);

    }

    private final Consumer<CompletableFuture<Void>> waitForFuture = ((CompletableFuture<Void> c) -> {
        try {
            c.get();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    });

}
