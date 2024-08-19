package net.tamasnovak.artifact.account.pendingaccount.service;

import net.tamasnovak.artifact.account.pendingaccount.dto.PendingAccountRegistration;

public interface PendingAccountService {
  void verifyAccountNotExistsByEmail(String email);

  void createPendingAccount(PendingAccountRegistration body);
}
