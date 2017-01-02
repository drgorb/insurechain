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

    public Warranty(Date startDate, Date endDate, WarrantyStatus status, String policyNumber) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.policyNumber = policyNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Warranty warranty = (Warranty) o;

        if (startDate != null ? !startDate.equals(warranty.startDate) : warranty.startDate != null) return false;
        if (endDate != null ? !endDate.equals(warranty.endDate) : warranty.endDate != null) return false;
        if (status != warranty.status) return false;
        return policyNumber != null ? policyNumber.equals(warranty.policyNumber) : warranty.policyNumber == null;
    }

    @Override
    public int hashCode() {
        int result = startDate != null ? startDate.hashCode() : 0;
        result = 31 * result + (endDate != null ? endDate.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (policyNumber != null ? policyNumber.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Warranty{" +
                "startDate=" + startDate +
                ", endDate=" + endDate +
                ", status=" + status +
                ", policyNumber='" + policyNumber + '\'' +
                '}';
    }
}
