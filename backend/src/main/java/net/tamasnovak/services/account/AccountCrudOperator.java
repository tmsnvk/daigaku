package net.tamasnovak.services.account;

import net.tamasnovak.dtos.account.access.PendingAccountRegistrationDto;

public interface AccountCrudOperator {
  void addAccount(PendingAccountRegistrationDto registrationData);
}
