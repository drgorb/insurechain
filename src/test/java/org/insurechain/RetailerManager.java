package org.insurechain;

import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;

import java.util.concurrent.CompletableFuture;

/**
 * Created by mroon on 21/12/16.
 */
public interface RetailerManager {

    CompletableFuture<Void> setSubContractAddresses (EthAddress insuranceManager);

    CompletableFuture<Void> requestRegistration(String companyName, EthAccount insurance);

    RegistrationState getRequestState(EthAccount retailer, EthAccount insurance);

    CompletableFuture<Void> setRequestState(EthAccount retailer, RegistrationState status);

    Long retailerCount();

    RetailerStruct getRetailer(Integer index);

    RetailerBalance getRetailerBalances(EthAccount retailer, EthAccount insurance);

    Boolean isInsurance(EthAccount insurance);
}
