package net.tamasnovak.entities.account.accountByRole;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.base.id.BaseSimpleIdEntity;

@Entity
@Table(name = "system_admins")
public final class SystemAdmin extends BaseSimpleIdEntity {
  @OneToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  private Account account;

  protected SystemAdmin() {}

  private SystemAdmin(Account account) {
    this.account = account;
  }

  public static SystemAdmin createSystemAdmin(Account account) {
    return new SystemAdmin(account);
  }

  public Account getAccount() {
    return account;
  }
}
