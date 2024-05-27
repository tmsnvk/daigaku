package net.tamasnovak.entities.account.accountByRole;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.base.accountRole.BaseAccountRole;

@Entity
@Table(name = "system_admins")
public final class SystemAdmin extends BaseAccountRole {
  protected SystemAdmin() {}

  private SystemAdmin(Account account) {
    super(account);
  }

  public static SystemAdmin createSystemAdmin(Account account) {
    return new SystemAdmin(account);
  }
}
