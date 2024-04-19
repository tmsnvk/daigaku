package net.tamasnovak.services.account.account;

import org.springframework.stereotype.Component;

@Component
public final class AccountConstants {
  final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system.";
  final String ACCOUNT_NOT_FOUND = "This email is not found in our database.";

  private AccountConstants() {}
}
