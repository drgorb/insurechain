package org.insurechain;

import org.adridadou.ethereum.EthereumFacade;
import org.adridadou.ethereum.provider.EthereumFacadeProvider;
import org.adridadou.ethereum.provider.EthereumJConfigs;
import org.adridadou.ethereum.values.CompiledContract;
import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;
import org.adridadou.ethereum.values.SoliditySource;
import org.adridadou.ethereum.values.config.DatabaseDirectory;
import org.apache.commons.io.IOUtils;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.adridadou.ethereum.keystore.AccountProvider.fromPrivateKey;

/**
 * Created by davidroon on 15.01.17.
 */
public class InsuranceOracle {
    private final Logger log = LoggerFactory.getLogger(InsuranceOracle.class);
    final FileWriter writer = new FileWriter(new File("warranty_report.txt"), true);

    public InsuranceOracle() throws IOException {
    }

    @Test
    public void run() throws ExecutionException, InterruptedException, IOException {
        final EthAccount alianz = fromPrivateKey("cab468af941365618e45836e3c4e08f53a330c87c37941f011f68ba3d448c47b");
        final EthAccount zurich = fromPrivateKey("26159a4da193a61993b747a845f8f688db987dc681b9e0b8105c0456acc47f6b");
        final EthAccount mobiliere = fromPrivateKey("e1815424842d37116c336c65f55a6314955c928e132c89cecb2e8e2246ae8ed0");

        List<String> lines = IOUtils.readLines(new FileReader(new File("src/app/contractDefinitions.js")));
        String first = lines.get(0);
        int firstQuote = first.indexOf("\"");
        int secondQuote = first.indexOf("\"", firstQuote + 1);
        final String address = first.substring(firstQuote + 1, secondQuote);
        final EthAddress retailerManagerAddress = EthAddress.of(address);
        final SoliditySource soliditySource = SoliditySource.from(new File("contracts/ContractDefinitions.sol"));
        final EthereumFacadeProvider.Builder provider = EthereumFacadeProvider
                .forNetwork(EthereumJConfigs.ropsten());
        provider.extendConfig()
                .listenPort(55555)
                .dbDirectory(DatabaseDirectory.db("ropsten-oracle"))
                .fastSync(true);
        writeInLog("test to see if it persists or not");

        EthereumFacade ethereum = provider.create();

        CompiledContract insurechain = ethereum.compile(soliditySource, "Insurechain").get();

        Insurechain alianzRetailerManager = ethereum.createContractProxy(insurechain.getAbi(), retailerManagerAddress, alianz, Insurechain.class);
        Insurechain zurichRetailerManager = ethereum.createContractProxy(insurechain.getAbi(), retailerManagerAddress, zurich, Insurechain.class);
        Insurechain mobiliereRetailerManager = ethereum.createContractProxy(insurechain.getAbi(), retailerManagerAddress, mobiliere, Insurechain.class);

        ethereum.observeEvents(insurechain.getAbi(),retailerManagerAddress,"WarrantyCreated", WarrantyCreated.class)
        .filter(event -> event.getInsurance().equals(alianz.getAddress()))
        .forEach(event -> {
            writeInLog("warranty created:" + event.toString());
            try {
                Thread.sleep(100000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            alianzRetailerManager.confirmWarranty(event.getProductId(), event.getSerialNumber(),"alianz-" + System.currentTimeMillis());
        });

        ethereum.observeEvents(insurechain.getAbi(),retailerManagerAddress,"WarrantyCreated", WarrantyCreated.class)
            .filter(event -> event.getInsurance().equals(zurich.getAddress()))
            .forEach(event -> {
                writeInLog("warranty created:" + event.toString());
                zurichRetailerManager.confirmWarranty(event.getProductId(), event.getSerialNumber(),"zurich-" + System.currentTimeMillis());
            });

        ethereum.observeEvents(insurechain.getAbi(),retailerManagerAddress,"WarrantyCreated", WarrantyCreated.class)
            .filter(event -> event.getInsurance().equals(mobiliere.getAddress()))
            .forEach(event -> {
                writeInLog("warranty created:" + event.toString());
                mobiliereRetailerManager.confirmWarranty(event.getProductId(), event.getSerialNumber(),"mobiliere-" + System.currentTimeMillis());
            });


        ethereum.observeEvents(insurechain.getAbi(),retailerManagerAddress,"WarrantyCanceled", WarrantyCanceled.class)
                .filter(event -> event.getInsurance().equals(alianz.getAddress()))
                .forEach(event -> writeInLog("New warranty canceled:" + event.toString()));

        ethereum.observeEvents(insurechain.getAbi(),retailerManagerAddress,"WarrantyCanceled", WarrantyCanceled.class)
                .filter(event -> event.getInsurance().equals(zurich.getAddress()))
                .forEach(event -> writeInLog("New warranty canceled:" + event.toString()));

        ethereum.observeEvents(insurechain.getAbi(),retailerManagerAddress,"WarrantyCanceled", WarrantyCanceled.class)
                .filter(event -> event.getInsurance().equals(mobiliere.getAddress()))
                .forEach(event -> writeInLog("New warranty canceled:" + event.toString()));

        ethereum.events().onReady().get();

        log.info("*********** sync done!");

        while(true) {
            Thread.sleep(500);
        }
    }

    private void writeInLog(final String str) {
        try {
            IOUtils.write(str + "\n", writer);
            writer.flush();
            log.info("**** " + str);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
