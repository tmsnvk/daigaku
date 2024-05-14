package net.tamasnovak.enums.status;

public enum OfferStatusType {
  CONDITIONAL("Conditional"),
  DEFERRED("Deferred"),
  REJECTED("Rejected"),
  UNCONDITIONAL("Unconditional");

  private final String name;

  OfferStatusType(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
