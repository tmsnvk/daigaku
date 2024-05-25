package net.tamasnovak.services.account.baseAccount.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.services.account.baseAccount.AccountLifeCycle;
import net.tamasnovak.services.account.baseAccount.AccountVerification;

public interface PendingAccountService extends AccountVerification, AccountLifeCycle<PendingAccountRegistrationDto> {}
