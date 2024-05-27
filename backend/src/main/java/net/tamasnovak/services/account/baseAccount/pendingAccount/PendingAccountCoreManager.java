package net.tamasnovak.services.account.baseAccount.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.services.account.baseAccount.AccountLifeCycleManager;
import net.tamasnovak.services.account.baseAccount.AccountVerificationManager;

public interface PendingAccountCoreManager extends AccountVerificationManager, AccountLifeCycleManager<PendingAccountRegistrationDto> {}
