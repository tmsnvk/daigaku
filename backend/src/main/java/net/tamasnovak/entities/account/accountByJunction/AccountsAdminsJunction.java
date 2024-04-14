package net.tamasnovak.entities.account.accountByJunction;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.account.accountByRole.SystemAdmin;

import java.io.Serializable;

@Entity
@Table(name = "accounts_admins_junction")
public final class AccountsAdminsJunction {
  @EmbeddedId
  private AccountsAdminsJunctionId id;

  @MapsId("accountId")
  @OneToOne
  @JoinColumn(name = "account_id")
  private Account accountId;

  @MapsId("adminId")
  @OneToOne
  @JoinColumn(name = "admin_id")
  private SystemAdmin systemAdminId;

  public AccountsAdminsJunction() {}

  public AccountsAdminsJunction(Account accountId, SystemAdmin systemAdminId) {
    this.accountId = accountId;
    this.systemAdminId = systemAdminId;
    this.id = new AccountsAdminsJunctionId(accountId.getId(), systemAdminId.getId());
  }

  public Account getAccountId() {
    return accountId;
  }

  public SystemAdmin getAdminId() {
    return systemAdminId;
  }

  @Embeddable
  public static class AccountsAdminsJunctionId implements Serializable {
    @Column(name = "account_id")
    private long accountId;

    @Column(name = "admin_id")
    private long adminId;

    public AccountsAdminsJunctionId() {}

    public AccountsAdminsJunctionId(long accountId, long adminId) {
      this.accountId = accountId;
      this.adminId = adminId;
    }

    public long getAccountId() {
      return accountId;
    }

    public long getAdminId() {
      return adminId;
    }
  }

  public AccountsAdminsJunctionId getId() {
    return id;
  }
}
