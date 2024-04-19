package net.tamasnovak.entities.account.baseAccount;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.institution.Institution;

@Entity
@Table(name = "pending_accounts")
public final class PendingAccount extends BaseAccount {
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference
  private Institution institution;

  protected PendingAccount() {}

  private PendingAccount(String firstName, String lastName, String email, Institution institution) {
    super(firstName, lastName, email);
    this.institution = institution;
  }

  public static PendingAccount createPendingAccount(String firstName, String lastname, String email, Institution institution) {
    return new PendingAccount(firstName, lastname, email, institution);
  }

  public Institution getInstitution() {
    return institution;
  }
}
