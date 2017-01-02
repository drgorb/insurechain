package org.insurechain;

import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;

import java.time.LocalDate;
import java.util.Date;
import java.util.concurrent.CompletableFuture;

/**
 * Created by mroon on 21/12/16.
 */
public interface Insurechain {

    CompletableFuture<Void> createInsurance(String name);

    CompletableFuture<Void> requestRegistration(String companyName, EthAccount insurance);

    /**
     * the status is passed as int because when it is passed as InsuranceStatus it fails
     */
    CompletableFuture<Void> setInsuranceState(EthAccount insurance, InsuranceStatus status);

    InsuranceStruct getInsurance(int index);

    RegistrationState getRequestState(EthAccount retailer, EthAccount insurance);

    CompletableFuture<Void> setRequestState(EthAccount retailer, RegistrationState status);

    CompletableFuture<Void> createWarranty(String productId, String serialNumber, EthAccount insurance, Date startDate, Date endDate, Integer price);

    CompletableFuture<Void> confirmWarranty(String productId, String serialNumber, String policyNumber);

    Long retailerCount();

    Long insuranceCount();

    String[] getRetailer(int index);

    EthAddress getOwner();

    UserRole getRole(EthAccount user);

    Warranty getWarranty(String productId, String serialNumber, EthAccount insurance);
}
