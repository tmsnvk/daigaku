package net.tamasnovak.services.account.accountRole;

import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.base.accountRole.BaseAccountRole;

public interface AccountRoleService<T extends BaseAccountRole> {
  T getAccountRoleByAccount(Account account);
}
