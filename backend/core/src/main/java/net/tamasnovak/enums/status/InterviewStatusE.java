package net.tamasnovak.enums.status;

public enum InterviewStatusE {
  INVITED("Invited"),
  NO_INTERVIEW("No Interview"),
  NOT_INVITED("Not Invited");

  private final String name;

  InterviewStatusE(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
