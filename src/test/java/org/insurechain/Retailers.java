package org.insurechain;

import org.adridadou.ethereum.values.EthAddress;

/**
 * Created by mroon on 21/12/16.
 */
public interface Retailers {
    boolean requestRegistration(String companyName, EthAddress insurance);
    void setRequestState(EthAddress retailer, byte status);
}
