/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.systemadmin.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.common.entity.BaseAccountType;

/**
 * Entity class that represents the system_admins database table.
 */
@Entity
@Table(name = "system_admins")
public final class SystemAdmin extends BaseAccountType {
  protected SystemAdmin() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private SystemAdmin(Account account) {
    super(account);
  }

  /**
   * The default system admin instance creator method.
   *
   * @param account The user's account.
   * @return {@link SystemAdmin}.
   */
  public static SystemAdmin createSystemAdmin(final Account account) {
    return new SystemAdmin(account);
  }
}
