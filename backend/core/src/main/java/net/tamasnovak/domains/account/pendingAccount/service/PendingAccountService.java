package net.tamasnovak.domains.account.pendingAccount.service;

import net.tamasnovak.domains.account.pendingAccount.dto.PendingAccountRegistration;

public interface PendingAccountService {
  void verifyAccountNotExistsByEmail(String email);

  void create(PendingAccountRegistration requestBody);
}
