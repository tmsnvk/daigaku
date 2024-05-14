package net.tamasnovak.enums.status;

public enum ApplicationStatusType {
  PLANNED("Planned"),
  SUBMITTED("Submitted"),
  WITHDRAWN("Withdrawn");

  private final String name;

  ApplicationStatusType(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
