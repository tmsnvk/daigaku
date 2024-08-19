package net.tamasnovak.artifact.accountRole.shared.entity;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToOne;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.shared.entity.id.BaseSimpleIdEntity;

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
