package org.insurechain;

import org.adridadou.ethereum.values.EthAccount;

import java.util.concurrent.CompletableFuture;

/**
 * Created by mroon on 21/12/16.
 */
public interface Insurechain {
    CompletableFuture<Void> requestRegistration(String companyName, EthAccount insurance);

    RegistrationState getRequestState(EthAccount retailer, EthAccount insurance);

    CompletableFuture<Void> setRequestState(EthAccount retailer, byte status);
}
