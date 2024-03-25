package net.tamasnovak.entities.account.accountsByJunction;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountsByRole.Admin;

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
  private Admin adminId;

  public AccountsAdminsJunction() {}

  public AccountsAdminsJunction(Account accountId, Admin adminId) {
    this.accountId = accountId;
    this.adminId = adminId;
    this.id = new AccountsAdminsJunctionId(accountId.getId(), adminId.getId());
  }

  public Account getAccountId() {
    return accountId;
  }

  public Admin getAdminId() {
    return adminId;
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
