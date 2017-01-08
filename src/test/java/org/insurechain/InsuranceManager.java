package org.insurechain;

import org.adridadou.ethereum.values.EthAccount;
import org.adridadou.ethereum.values.EthAddress;

import java.util.concurrent.CompletableFuture;

/**
 * Created by mroon on 21/12/16.
 */
public interface InsuranceManager {

    CompletableFuture<Void> createInsurance(String name, EthAddress priceCalculator);

    CompletableFuture<Void> setInsuranceState(EthAccount insurance, InsuranceStatus status);

    InsuranceStruct getInsurance(int index);

    Long insuranceCount();

    InsuranceStatus getInsuranceStatus(EthAccount insuranceAddress);

}
