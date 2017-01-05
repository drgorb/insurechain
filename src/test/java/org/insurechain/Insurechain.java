package org.insurechain;

import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;

import java.util.Date;
import java.util.concurrent.CompletableFuture;

/**
 * Created by mroon on 21/12/16.
 */
public interface Insurechain {

    CompletableFuture<Void> setSubContractAddresses (EthAddress insuranceManager, EthAddress retailerManager);

    CompletableFuture<Void> createWarranty(String productId, String serialNumber, EthAccount insurance, Date startDate, Date endDate, Integer price);

    CompletableFuture<Void> confirmWarranty(String productId, String serialNumber, String policyNumber);

    CompletableFuture<Void> cancelWarranty(String productId, String serialNumber);

    EthAddress getOwner();

    UserRole getRole(EthAccount user);

    Warranty getWarranty(String productId, String serialNumber, EthAccount insurance);

}
