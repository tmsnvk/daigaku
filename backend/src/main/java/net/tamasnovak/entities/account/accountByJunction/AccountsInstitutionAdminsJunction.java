package net.tamasnovak.entities.account.accountByJunction;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.accountByRole.SystemAdmin;
import net.tamasnovak.entities.account.baseAccount.Account;

import java.io.Serializable;

@Entity
@Table(name = "accounts_institution_admins_junction")
public final class AccountsInstitutionAdminsJunction {
  @EmbeddedId
  private AccountsInstitutionAdminsJunctionId id;

  @MapsId("account")
  @OneToOne
  @JoinColumn(name = "account_id")
  private Account account;

  @MapsId("admin")
  @OneToOne
  @JoinColumn(name = "institution_admin_id")
  private SystemAdmin institutionAdmin;

  protected AccountsInstitutionAdminsJunction() {}

  public AccountsInstitutionAdminsJunction(Account account, SystemAdmin institutionAdmin) {
    this.account = account;
    this.institutionAdmin = institutionAdmin;
    this.id = new AccountsInstitutionAdminsJunctionId(account.getId(), institutionAdmin.getId());
  }

  public Account getAccount() {
    return account;
  }

  public SystemAdmin getInstitutionAdmin() {
    return institutionAdmin;
  }

  @Embeddable
  public static class AccountsInstitutionAdminsJunctionId implements Serializable {
    @Column(name = "account_id")
    private long account;

    @Column(name = "institution_admin_id")
    private long admin;

    public AccountsInstitutionAdminsJunctionId() {}

    public AccountsInstitutionAdminsJunctionId(long account, long admin) {
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

  public AccountsInstitutionAdminsJunctionId getId() {
    return id;
  }
}
