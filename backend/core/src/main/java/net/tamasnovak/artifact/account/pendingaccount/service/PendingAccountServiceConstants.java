package net.tamasnovak.artifact.account.pendingaccount.service;

import org.springframework.stereotype.Component;

@Component
public final class PendingAccountServiceConstants {
  final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system.";

  private PendingAccountServiceConstants() {}
}
