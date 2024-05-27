package net.tamasnovak.services.account.baseAccount.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.services.account.baseAccount.AccountLifeCycleService;
import net.tamasnovak.services.account.baseAccount.AccountVerificationService;

public interface PendingAccountCoreService extends AccountVerificationService, AccountLifeCycleService<PendingAccountRegistrationDto> {}
