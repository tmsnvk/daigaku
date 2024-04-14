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
@Table(name = "accounts_system_admins_junction")
public final class AccountsSystemAdminsJunction {
  @EmbeddedId
  private AccountsSystemAdminsJunctionId id;

  @MapsId("account")
  @OneToOne
  @JoinColumn(name = "account_id")
  private Account account;

  @MapsId("admin")
  @OneToOne
  @JoinColumn(name = "system_admin_id")
  private SystemAdmin systemAdmin;

  protected AccountsSystemAdminsJunction() {}

  public AccountsSystemAdminsJunction(Account account, SystemAdmin systemAdmin) {
    this.account = account;
    this.systemAdmin = systemAdmin;
    this.id = new AccountsSystemAdminsJunctionId(account.getId(), systemAdmin.getId());
  }

  public Account getAccount() {
    return account;
  }

  public SystemAdmin getAdminId() {
    return systemAdmin;
  }

  @Embeddable
  public static class AccountsSystemAdminsJunctionId implements Serializable {
    @Column(name = "account_id")
    private long account;

    @Column(name = "system_admin_id")
    private long admin;

    public AccountsSystemAdminsJunctionId() {}

    public AccountsSystemAdminsJunctionId(long account, long admin) {
      this.account = account;
      this.admin = admin;
    }

    public long getAccount() {
      return account;
    }

    public long getAdmin() {
      return admin;
    }
  }

  public AccountsSystemAdminsJunctionId getId() {
    return id;
  }
}
