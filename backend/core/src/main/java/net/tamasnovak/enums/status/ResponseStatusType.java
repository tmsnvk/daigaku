package net.tamasnovak.enums.status;

public enum ResponseStatusType {
  FIRM_CHOICE("Firm Choice"),
  INSURANCE_CHOICE("Insurance Choice"),
  OFFER_DECLINED("Offer Declined");

  private final String name;

  ResponseStatusType(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
