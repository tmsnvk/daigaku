package net.tamasnovak.services.account.pendingAccount;

import net.tamasnovak.dtos.account.access.PendingAccountRegistrationDto;

public interface PendingAccountService {
  void checkIfExistsByEmail(String email);
  void addAccount(PendingAccountRegistrationDto registrationData);
}
