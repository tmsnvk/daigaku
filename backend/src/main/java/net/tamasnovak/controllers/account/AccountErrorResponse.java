package net.tamasnovak.controllers.account;

import lombok.Getter;

@Getter
public final class AccountErrorResponse {
  private final int status;
  private final String message;
  private final long timestamp;

  AccountErrorResponse(int status, String message, long timestamp) {
    this.status = status;
    this.message = message;
    this.timestamp = timestamp;
  }
}
