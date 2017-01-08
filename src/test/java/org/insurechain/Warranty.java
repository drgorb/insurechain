package org.insurechain;

import java.util.Date;

/**
 * Created by davidroon on 02.01.17.
 */
public class Warranty {
    private Date startDate;
    private Date endDate;
    private WarrantyStatus status;
    private String policyNumber;
    private Integer price;
    private Integer claimCount;

    public Warranty(Date startDate, Date endDate, WarrantyStatus status, String policyNumber, Integer price, Integer claimCount) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.policyNumber = policyNumber;
        this.price = price;
        this.claimCount = claimCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Warranty warranty = (Warranty) o;

        if (!startDate.equals(warranty.startDate)) return false;
        if (!endDate.equals(warranty.endDate)) return false;
        if (status != warranty.status) return false;
        if (!policyNumber.equals(warranty.policyNumber)) return false;
        if (!price.equals(warranty.price)) return false;
        return claimCount.equals(warranty.claimCount);
    }

    @Override
    public int hashCode() {
        int result = startDate.hashCode();
        result = 31 * result + endDate.hashCode();
        result = 31 * result + status.hashCode();
        result = 31 * result + policyNumber.hashCode();
        result = 31 * result + price.hashCode();
        result = 31 * result + claimCount.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Warranty{" +
                "startDate=" + startDate +
                ", endDate=" + endDate +
                ", status=" + status +
                ", policyNumber='" + policyNumber + '\'' +
                ", price=" + price +
                ", claimCount=" + claimCount +
                '}';
    }
}
