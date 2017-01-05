package org.insurechain;

/**
 * Created by davidroon on 02.01.17.
 */
public class RetailerBalance {
    private Integer sales;
    private Integer payments;
    private Integer claims;

    public RetailerBalance(Integer sales, Integer payments, Integer claims) {
        this.sales = sales;
        this.payments = payments;
        this.claims = claims;
    }
}
