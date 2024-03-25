package net.tamasnovak.entities.account.accountsByRole;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.Account;

@Entity
@Table(name = "admins")
public final class Admin {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true, insertable = false, updatable = false, nullable = false)
  private long id;

  @OneToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  @JsonManagedReference
  private Account accountId;

  public Admin() {}

  public Admin(Account accountId) {
    this.accountId = accountId;
  }

  public long getId() {
    return id;
  }

  public Account getAccountId() {
    return accountId;
  }
}
