package org.insurechain;

import org.adridadou.ethereum.values.EthAddress;

/**
 * Created by mroon on 28/12/16.
 */
public class InsuranceStruct {
    private String name;
    private EthAddress address;
    private InsuranceStatus status;

    public InsuranceStruct(String name, EthAddress address, int status) {
        this.name = name;
        this.address = address;
        this.status = InsuranceStatus.values()[status];
    }

    public String getName() {
        return name;
    }

    public InsuranceStatus getStatus() {
        return status;
    }

    @Override
    public boolean equals(Object o) {
        if(o instanceof InsuranceStruct){
            InsuranceStruct is = (InsuranceStruct) o;
            return is.status == this.status && is.name.equals(this.name) && is.address.equals(this.address);
        }
        return false;
    }
}
