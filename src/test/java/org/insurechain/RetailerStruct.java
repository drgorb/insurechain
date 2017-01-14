package org.insurechain;

import org.adridadou.ethereum.values.EthAddress;

/**
 * Created by davidroon on 02.01.17.
 */
public class RetailerStruct {
    private EthAddress retailer;
    private String companyName;
    private RetailerStatus status;
    private final RetailerStatus insuranceStatus;

    public RetailerStruct(EthAddress retailer, String companyName, RetailerStatus status, RetailerStatus insuranceStatus) {
        this.retailer = retailer;
        this.companyName = companyName;
        this.status = status;
        this.insuranceStatus = insuranceStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RetailerStruct that = (RetailerStruct) o;

        if (retailer != null ? !retailer.equals(that.retailer) : that.retailer != null) return false;
        if (companyName != null ? !companyName.equals(that.companyName) : that.companyName != null) return false;
        if (status != that.status) return false;
        return insuranceStatus == that.insuranceStatus;
    }

    @Override
    public int hashCode() {
        int result = retailer != null ? retailer.hashCode() : 0;
        result = 31 * result + (companyName != null ? companyName.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (insuranceStatus != null ? insuranceStatus.hashCode() : 0);
        return result;
    }
}
