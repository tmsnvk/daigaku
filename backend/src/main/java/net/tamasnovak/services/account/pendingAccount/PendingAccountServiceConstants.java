package net.tamasnovak.services.account.pendingAccount;

import org.springframework.stereotype.Service;

@Service
public final class PendingAccountServiceConstants {
  final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system.";

  private PendingAccountServiceConstants() {}
}
