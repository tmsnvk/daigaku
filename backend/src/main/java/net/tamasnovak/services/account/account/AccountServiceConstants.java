package net.tamasnovak.services.account.account;

import org.springframework.stereotype.Service;

@Service
public final class AccountServiceConstants {
  final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system.";
  final String USER_NOT_FOUND = "This email address is not registered in our database.";

  private AccountServiceConstants() {}
}
