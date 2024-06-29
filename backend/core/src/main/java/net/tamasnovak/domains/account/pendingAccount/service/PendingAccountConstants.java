package net.tamasnovak.domains.account.pendingAccount.service;

import org.springframework.stereotype.Component;

@Component
public final class PendingAccountConstants {
  final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system.";

  private PendingAccountConstants() {}
}
