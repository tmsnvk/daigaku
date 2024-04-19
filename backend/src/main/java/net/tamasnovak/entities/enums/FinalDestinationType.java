package net.tamasnovak.entities.enums;

public enum FinalDestinationType {
  FINAL_DESTINATION("Final Destination"),
  DEFERRED_FINAL_DESTINATION("Final Destination (Deferred Entry)"),
  NOT_FINAL_DESTINATION("Not Final Destination");

  public final String type;

  FinalDestinationType(String type) {
    this.type = type;
  }

  public String getType() {
    return type;
  }
}
