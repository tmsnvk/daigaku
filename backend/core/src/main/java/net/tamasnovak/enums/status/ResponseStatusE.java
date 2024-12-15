/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.enums.status;

public enum ResponseStatusE {
  FIRM_CHOICE("Firm Choice"),
  INSURANCE_CHOICE("Insurance Choice"),
  OFFER_DECLINED("Offer Declined");

  private final String name;

  ResponseStatusE(String name) {
    this.name = name;
  }

  public String getValue() {
    return name;
  }
}
