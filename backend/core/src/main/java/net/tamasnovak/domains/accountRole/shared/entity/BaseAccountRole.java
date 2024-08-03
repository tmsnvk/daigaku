package net.tamasnovak.domains.accountRole.shared.entity;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToOne;
import net.tamasnovak.domains.account.account.entity.Account;
import net.tamasnovak.domains.shared.entity.id.BaseSimpleIdEntity;

@MappedSuperclass
public abstract class BaseAccountRole extends BaseSimpleIdEntity {
  @OneToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  protected Account account;

  protected BaseAccountRole() {}

  protected BaseAccountRole(Account account) {
    this.account = account;
  }
}
