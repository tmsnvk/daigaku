package net.tamasnovak.entities.enums;

public enum OfferStatusType {
  CONDITIONAL("Conditional"),
  DEFERRED("Deferred"),
  REJECTED("Rejected"),
  UNCONDITIONAL("Unconditional");

  private final String type;

  OfferStatusType(String type) {
    this.type = type;
  }

  public String getType() {
    return type;
  }
}
