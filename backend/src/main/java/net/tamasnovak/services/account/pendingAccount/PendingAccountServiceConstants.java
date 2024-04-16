package net.tamasnovak.services.account.pendingAccount;

import org.springframework.stereotype.Component;

@Component
public final class PendingAccountServiceConstants {
  final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system.";
  final String NOT_VALID_INSTITUTION = "Select a valid institution.";

  private PendingAccountServiceConstants() {}
}
