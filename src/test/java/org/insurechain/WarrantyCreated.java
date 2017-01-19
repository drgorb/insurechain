package org.insurechain;

import org.adridadou.ethereum.values.EthAddress;

/**
 * Created by davidroon on 19.01.17.
 * event WarrantyCreated(string productId, string serialNumber,address retailer, address insurance);
 */
public class WarrantyCreated {
    private final String productId;
    private final String serialNumber;
    private final EthAddress retailer;
    private final EthAddress insurance;

    public WarrantyCreated(String productId, String serialNumber, EthAddress retailer, EthAddress insurance) {
        this.productId = productId;
        this.serialNumber = serialNumber;
        this.retailer = retailer;
        this.insurance = insurance;
    }

    public String getProductId() {
        return productId;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public EthAddress getRetailer() {
        return retailer;
    }

    public EthAddress getInsurance() {
        return insurance;
    }

    @Override
    public String toString() {
        return "WarrantyCreated{" +
                "productId='" + productId + '\'' +
                ", serialNumber='" + serialNumber + '\'' +
                ", retailer=" + retailer +
                ", insurance=" + insurance +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WarrantyCreated that = (WarrantyCreated) o;

        if (productId != null ? !productId.equals(that.productId) : that.productId != null) return false;
        if (serialNumber != null ? !serialNumber.equals(that.serialNumber) : that.serialNumber != null) return false;
        if (retailer != null ? !retailer.equals(that.retailer) : that.retailer != null) return false;
        return insurance != null ? insurance.equals(that.insurance) : that.insurance == null;
    }

    @Override
    public int hashCode() {
        int result = productId != null ? productId.hashCode() : 0;
        result = 31 * result + (serialNumber != null ? serialNumber.hashCode() : 0);
        result = 31 * result + (retailer != null ? retailer.hashCode() : 0);
        result = 31 * result + (insurance != null ? insurance.hashCode() : 0);
        return result;
    }
}
