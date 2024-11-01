/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.entity;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.account.common.entity.BaseAccount;
import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.support.institution.entity.Institution;

/**
 * Entity class that represents the pending_accounts database table.
 *
 * @since 0.0.1
 */
@Entity
@Table(name = "pending_accounts")
public final class PendingAccount extends BaseAccount {
  protected PendingAccount() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private PendingAccount(String firstName, String lastName, String email, Institution institution, Role role) {
    super(firstName, lastName, email, institution, role);
  }

  /**
   * The default pending account creator method.
   *
   * @param firstName The pending account's first name.
   * @param lastname The pending account's last name.
   * @param email The pending account's email.
   * @param institution The pending account's institution.
   * @param role The pending account's role.
   * @return {@link PendingAccount}
   */
  public static PendingAccount createPendingAccount(
    final String firstName, final String lastname, final String email, final Institution institution, final Role role) {
    return new PendingAccount(firstName, lastname, email, institution, role);
  }

  @Override
  public int hashCode() {
    return Objects.hash(email, id, uuid);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }

    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    PendingAccount that = (PendingAccount) o;
    return Objects.equals(email, that.email) && Objects.equals(id, that.id) && Objects.equals(uuid, that.uuid);
  }
}
