package net.tamasnovak.services.account.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;

public interface PendingAccountService {
  void checkIfExistsByEmail(String email);
  void createAccount(PendingAccountRegistrationDto registrationData);
}
