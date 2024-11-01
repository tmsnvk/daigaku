/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 *
 * @since 0.0.1
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
   * The default system admin creator method.
   *
   * @param account The user's account.
   * @return {@link SystemAdmin}
   */
  public static SystemAdmin createSystemAdmin(final Account account) {
    return new SystemAdmin(account);
  }
}
