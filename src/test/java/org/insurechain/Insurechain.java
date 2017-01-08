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

    CompletableFuture<Void> createWarranty(String productId, String serialNumber, EthAccount insurance, Date startDate,
                                           Date endDate, Integer price);

    CompletableFuture<Void> confirmWarranty(String productId, String serialNumber, String policyNumber);

    CompletableFuture<Void> cancelWarranty(String productId, String serialNumber, EthAccount insurance);

    Boolean isRegisteredRetailer(EthAccount insurance, EthAccount retailer);

    EthAddress getOwner();

    UserRole getRole(EthAccount user);

    Integer getWarrantyQuote(String productId, EthAccount insurance, Date startDate, Date endDate, Integer productPrice);

    Warranty getWarranty(String productId, String serialNumber, EthAccount insurance);

    CompletableFuture<Void> createClaim(String productId, String serialNumber, EthAccount insurance, Integer amount,
                                        String description);

    Claim getClaim(String productId, String serialNumber, EthAccount insurance, Integer idx);
}
