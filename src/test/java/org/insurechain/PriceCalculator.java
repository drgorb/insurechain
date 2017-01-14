package org.insurechain;

import java.util.Date;

/**
 * Created by davidroon on 11.01.17.
 */
public interface PriceCalculator {
    Integer getWarrantyPrice(String productId, Date startDate, Date endDate, Integer productPrice);
}
