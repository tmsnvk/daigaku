package net.tamasnovak.services.account.accountByRole;

import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.base.accountRole.BaseAccountRole;

public interface AccountRoleService<T extends BaseAccountRole> {
  T getAccountRoleByAccount(Account account);
}
