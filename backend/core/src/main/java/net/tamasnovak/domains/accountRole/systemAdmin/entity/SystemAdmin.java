package net.tamasnovak.domains.accountRole.systemAdmin.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import net.tamasnovak.domains.account.account.entity.Account;
import net.tamasnovak.domains.accountRole.shared.entity.BaseAccountRole;

@Entity
@Table(name = "system_admins")
public final class SystemAdmin extends BaseAccountRole {
  protected SystemAdmin() {}

  private SystemAdmin(Account account) {
    super(account);
  }

  public static SystemAdmin createSystemAdmin(final Account account) {
    return new SystemAdmin(account);
  }
}
