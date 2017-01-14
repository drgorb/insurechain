package org.insurechain;

import org.adridadou.ethereum.values.EthAddress;

import java.util.Date;

/**
 * Created by davidroon on 02.01.17.
 */
public class Warranty {
    private EthAddress retailer;
    private EthAddress insurance;
    private Date startDate;
    private Date endDate;
    private WarrantyStatus status;
    private String policyNumber;
    private String productId;
    private String serial;
    private Integer price;
    private Integer claimCount;

    public Warranty(EthAddress retailer, EthAddress insurance, Date startDate, Date endDate, WarrantyStatus status, String policyNumber, String productId, String serial, Integer price, Integer claimCount) {
        this.retailer = retailer;
        this.insurance = insurance;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.policyNumber = policyNumber;
        this.productId = productId;
        this.serial = serial;
        this.price = price;
        this.claimCount = claimCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Warranty warranty = (Warranty) o;

        if (!retailer.equals(warranty.retailer)) return false;
        if (!insurance.equals(warranty.insurance)) return false;
        if (!startDate.equals(warranty.startDate)) return false;
        if (!endDate.equals(warranty.endDate)) return false;
        if (status != warranty.status) return false;
        if (!policyNumber.equals(warranty.policyNumber)) return false;
        if (!productId.equals(warranty.productId)) return false;
        if (!serial.equals(warranty.serial)) return false;
        if (!price.equals(warranty.price)) return false;
        return claimCount.equals(warranty.claimCount);
    }

    @Override
    public int hashCode() {
        int result = retailer.hashCode();
        result = 31 * result + insurance.hashCode();
        result = 31 * result + startDate.hashCode();
        result = 31 * result + endDate.hashCode();
        result = 31 * result + status.hashCode();
        result = 31 * result + policyNumber.hashCode();
        result = 31 * result + productId.hashCode();
        result = 31 * result + serial.hashCode();
        result = 31 * result + price.hashCode();
        result = 31 * result + claimCount.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Warranty{" +
                "retailer=" + retailer +
                ", insurance=" + insurance +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", status=" + status +
                ", policyNumber='" + policyNumber + '\'' +
                ", productId='" + productId + '\'' +
                ", serial='" + serial + '\'' +
                ", price=" + price +
                ", claimCount=" + claimCount +
                '}';
    }
}
