package net.tamasnovak.entities.account.baseAccount;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "pending_accounts")
public final class PendingAccount extends BaseAccount {
  protected PendingAccount() {}

  public PendingAccount(String firstName, String lastName, String email) {
    super(firstName, lastName, email);
  }
}
