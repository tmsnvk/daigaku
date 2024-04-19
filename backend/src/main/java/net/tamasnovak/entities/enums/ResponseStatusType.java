package net.tamasnovak.entities.enums;

public enum ResponseStatusType {
  FIRM_CHOICE("Firm Choice"),
  INSURANCE_CHOICE("Insurance Choice"),
  OFFER_DECLINED("Offer Declined");

  public final String type;

  ResponseStatusType(String type) {
    this.type = type;
  }

  public String getType() {
    return type;
  }
}
