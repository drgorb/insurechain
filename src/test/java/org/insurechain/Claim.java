package org.insurechain;

import org.adridadou.ethereum.values.EthAccount;

/**
 * Created by davidroon on 02.01.17.
 */
public class Claim {
    private EthAccount retailer;
    private Integer amount;
    private String description;

    public Claim(EthAccount retailer, Integer amount, String description) {
        this.retailer = retailer;
        this.amount = amount;
        this.description = description;
    }
}
