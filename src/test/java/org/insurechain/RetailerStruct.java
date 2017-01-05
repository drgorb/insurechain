package org.insurechain;

import org.adridadou.ethereum.values.EthAddress;

/**
 * Created by davidroon on 02.01.17.
 */
public class RetailerStruct {
    private EthAddress retailer;
    private String companyName;

    public RetailerStruct(EthAddress retailer, String companyName) {
        this.retailer = retailer;
        this.companyName = companyName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RetailerStruct that = (RetailerStruct) o;

        if (!retailer.equals(that.retailer)) return false;
        return companyName.equals(that.companyName);
    }

    @Override
    public int hashCode() {
        int result = retailer.hashCode();
        result = 31 * result + companyName.hashCode();
        return result;
    }
}
