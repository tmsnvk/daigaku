package net.tamasnovak.entities.account.accountByRole;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.base.id.BaseSimpleIdEntity;
import net.tamasnovak.entities.institution.Institution;

@Entity
@Table(name = "institution_admins")
public final class InstitutionAdmin extends BaseSimpleIdEntity {
  @OneToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  private Account account;

  @ManyToOne
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference(value = "institution_institution_admin_reference")
  private Institution institution;

  protected InstitutionAdmin() {}

  private InstitutionAdmin(Account account, Institution institution) {
    this.account = account;
    this.institution = institution;
  }

  public static InstitutionAdmin createInstitutionAdmin(Account account, Institution institution) {
    return new InstitutionAdmin(account, institution);
  }

  public Account getAccount() {
    return account;
  }

  public Institution getInstitution() {
    return institution;
  }
}
