package net.tamasnovak.services.account.account;

import org.springframework.stereotype.Service;

@Service
public final class AccountServiceConstants {
  final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system.";

  private AccountServiceConstants() {}
}
