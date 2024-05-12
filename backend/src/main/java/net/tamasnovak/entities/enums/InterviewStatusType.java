package net.tamasnovak.entities.enums;

public enum InterviewStatusType {
  INVITED("Invited"),
  NO_INTERVIEW("No Interview"),
  NOT_INVITED("Not Invited");

  private final String type;

  InterviewStatusType(String type) {
    this.type = type;
  }

  public String getType() {
    return type;
  }
}
