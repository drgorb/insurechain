package org.insurechain;

import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;

import java.util.concurrent.CompletableFuture;

/**
 * Created by mroon on 21/12/16.
 */
public interface Insurechain {

    CompletableFuture<Void> createInsurance(String name);
    CompletableFuture<Void> requestRegistration(String companyName, EthAccount insurance);
    /**the status is passed as int because when it is passed as InsuranceStatus it fails*/
    CompletableFuture<Void> setInsuranceState(EthAccount insurance, int status);

    RegistrationState getRequestState(EthAccount retailer, EthAccount insurance);
    CompletableFuture<Void> setRequestState(EthAccount retailer, RegistrationState status);

    Long retailerCount();
    Long insuranceCount();

    String[] getRetailer(int index);

    EthAddress getOwner();
}
