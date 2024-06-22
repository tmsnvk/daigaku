package net.tamasnovak.domains.accountRole.institutionAdmin.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.accountRole.shared.models.entities.BaseAccountRole;
import net.tamasnovak.domains.support.institution.models.entity.Institution;

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

  public static InstitutionAdmin createInstitutionAdmin(Account account, Institution institution) {
    return new InstitutionAdmin(account, institution);
  }
}
