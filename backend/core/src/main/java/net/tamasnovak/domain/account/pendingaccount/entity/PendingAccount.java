package net.tamasnovak.domain.account.pendingaccount.entity;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import net.tamasnovak.domain.account.shared.entity.BaseAccount;
import net.tamasnovak.domain.role.entity.Role;
import net.tamasnovak.domain.support.institution.entity.Institution;

@Entity
@Table(name = "pending_accounts")
public final class PendingAccount extends BaseAccount {
  protected PendingAccount() {}

  private PendingAccount(String firstName, String lastName, String email, Institution institution, Role role) {
    super(firstName, lastName, email, institution, role);
  }

  public static PendingAccount createPendingAccount(final String firstName,
                                                    final String lastname,
                                                    final String email,
                                                    final Institution institution,
                                                    final Role role) {
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
