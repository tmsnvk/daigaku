package net.tamasnovak.services.account.accountByRole;

import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.base.accountRole.BaseAccountRole;

public interface CoreAccountByRoleService<T extends BaseAccountRole> {
  T getAccountTypeByAccount(Account account);
}
