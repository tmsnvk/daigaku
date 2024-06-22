package net.tamasnovak.domains.accountRole.systemAdmin.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.accountRole.shared.models.entities.BaseAccountRole;

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
