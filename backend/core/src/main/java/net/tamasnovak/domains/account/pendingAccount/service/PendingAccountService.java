package net.tamasnovak.domains.account.pendingAccount.service;

import net.tamasnovak.domains.account.pendingAccount.models.dtoRequests.PendingAccountRegistrationDto;

public interface PendingAccountService {
  void verifyAccountNotExistsByEmail(String email);

  void create(PendingAccountRegistrationDto requestBody);
}
