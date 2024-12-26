/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.common.entity;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToOne;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.common.entity.id.BaseSimpleIdEntity;

/**
 * Abstract entity class that represents an ancestor class for account-type entities.
 */
@MappedSuperclass
public abstract class BaseAccountType extends BaseSimpleIdEntity {
  @OneToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  protected Account account;

  protected BaseAccountType() {
  }

  protected BaseAccountType(Account account) {
    this.account = account;
  }
}
