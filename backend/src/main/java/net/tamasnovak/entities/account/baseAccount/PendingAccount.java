package net.tamasnovak.entities.account.baseAccount;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.entities.role.Role;

@Entity
@Table(name = "pending_accounts")
public final class PendingAccount extends BaseAccount {
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference
  private Institution institution;

  protected PendingAccount() {}

  private PendingAccount(String firstName, String lastName, String email, Institution institution, Role role) {
    super(firstName, lastName, email, role);
    this.institution = institution;
  }

  public static PendingAccount createPendingAccount(String firstName, String lastname, String email, Institution institution, Role role) {
    return new PendingAccount(firstName, lastname, email, institution, role);
  }

  public Institution getInstitution() {
    return institution;
  }
}
