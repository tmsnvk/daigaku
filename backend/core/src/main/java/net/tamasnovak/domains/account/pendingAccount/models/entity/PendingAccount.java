package net.tamasnovak.domains.account.pendingAccount.models.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import net.tamasnovak.domains.account.shared.models.BaseAccount;
import net.tamasnovak.domains.role.models.entity.Role;
import net.tamasnovak.domains.support.institution.models.entity.Institution;

import java.util.Objects;

@Entity
@Table(name = "pending_accounts")
public final class PendingAccount extends BaseAccount {
  protected PendingAccount() {}

  private PendingAccount(String firstName, String lastName, String email, Institution institution, Role role) {
    super(firstName, lastName, email, institution, role);
  }

  public static PendingAccount createPendingAccount(String firstName, String lastname, String email, Institution institution, Role role) {
    return new PendingAccount(firstName, lastname, email, institution, role);
  }

  @Override
  public int hashCode() {
    return Objects.hash(email, id, uuid);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    PendingAccount that = (PendingAccount) o;
    return Objects.equals(email, that.email) && Objects.equals(id, that.id) && Objects.equals(uuid, that.uuid);
  }
}
