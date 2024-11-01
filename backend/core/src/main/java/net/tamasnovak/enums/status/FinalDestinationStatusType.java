package net.tamasnovak.enums.status;

public enum FinalDestinationStatusType {
  FINAL_DESTINATION("Final Destination"),
  DEFERRED_FINAL_DESTINATION("Final Destination (Deferred Entry)"),
  NOT_FINAL_DESTINATION("Not Final Destination");

  private final String name;

  FinalDestinationStatusType(String name) {
    this.name = name;
  }

  public String getValue() {
    return name;
  }
}
