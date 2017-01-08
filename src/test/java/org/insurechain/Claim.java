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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Claim claim = (Claim) o;

        if (!retailer.equals(claim.retailer)) return false;
        if (!amount.equals(claim.amount)) return false;
        return description.equals(claim.description);
    }

    @Override
    public int hashCode() {
        int result = retailer.hashCode();
        result = 31 * result + amount.hashCode();
        result = 31 * result + description.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Claim{" +
                "retailer=" + retailer +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                '}';
    }
}
