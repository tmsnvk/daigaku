package net.tamasnovak.services.pedingAccount;

import org.springframework.stereotype.Service;

@Service
public final class PendingAccountServiceMessages {
  final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system. Choose another one.";

  private PendingAccountServiceMessages() {}
}
