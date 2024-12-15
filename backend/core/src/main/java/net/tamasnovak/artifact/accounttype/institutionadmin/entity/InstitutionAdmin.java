/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.institutionadmin.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.common.entity.BaseAccountType;
import net.tamasnovak.artifact.support.institution.entity.Institution;

/**
 * Entity class that represents the institution_admins database table.
 *
 * @since 0.0.1
 */
@Entity
@Table(name = "institution_admins")
public final class InstitutionAdmin extends BaseAccountType {
  @ManyToOne
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference(value = "institution-institution_admin_reference")
  private Institution institution;

  protected InstitutionAdmin() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private InstitutionAdmin(Account account, Institution institution) {
    super(account);
    this.institution = institution;
  }

  /**
   * The default institution admin instance creator method.
   *
   * @param account The user's account.
   * @param institution The user's institution.
   * @return {@link InstitutionAdmin}.
   */
  public static InstitutionAdmin createInstitutionAdmin(final Account account, final Institution institution) {
    return new InstitutionAdmin(account, institution);
  }
}
