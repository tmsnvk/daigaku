package net.tamasnovak.artifact.accountRole.institutionadmin.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accountRole.shared.entity.BaseAccountRole;
import net.tamasnovak.artifact.support.institution.entity.Institution;

@Entity
@Table(name = "institution_admins")
public final class InstitutionAdmin extends BaseAccountRole {
  @ManyToOne
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference(value = "institution-institution_admin_reference")
  private Institution institution;

  protected InstitutionAdmin() {}

  private InstitutionAdmin(Account account, Institution institution) {
    super(account);
    this.institution = institution;
  }

  public static InstitutionAdmin createInstitutionAdmin(final Account account,
                                                        final Institution institution) {
    return new InstitutionAdmin(account, institution);
  }
}
