package net.tamasnovak.entities.base.accountRole;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToOne;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.base.id.BaseSimpleIdEntity;

@MappedSuperclass
public abstract class BaseAccountRole extends BaseSimpleIdEntity {
  @OneToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  private Account account;

  protected BaseAccountRole() {}

  protected BaseAccountRole(Account account) {
    this.account = account;
  }

  public Account getAccount() {
    return account;
  }
}
