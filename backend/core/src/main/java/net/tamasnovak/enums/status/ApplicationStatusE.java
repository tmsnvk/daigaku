package net.tamasnovak.enums.status;

public enum ApplicationStatusE {
  PLANNED("Planned"),
  SUBMITTED("Submitted"),
  WITHDRAWN("Withdrawn");

  private final String name;

  ApplicationStatusE(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
