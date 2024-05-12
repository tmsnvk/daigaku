package net.tamasnovak.entities.enums;

public enum ApplicationStatusType {
  PLANNED("Planned"),
  SUBMITTED("Submitted"),
  WITHDRAWN("Withdrawn");

  private final String type;

  ApplicationStatusType(String type) {
    this.type = type;
  }

  public String getType() {
    return type;
  }
}
