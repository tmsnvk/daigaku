package net.tamasnovak.services.account.accountRole;

import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.base.accountRole.BaseAccountRole;

public interface AccountRoleManager<T extends BaseAccountRole> {
  T getAccountRoleByAccount(Account account);
}
