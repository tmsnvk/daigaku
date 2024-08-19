package net.tamasnovak.domain.account.pendingaccount.service;

import net.tamasnovak.domain.account.pendingaccount.dto.PendingAccountRegistration;

public interface PendingAccountService {
  void verifyAccountNotExistsByEmail(String email);

  void create(PendingAccountRegistration body);
}
