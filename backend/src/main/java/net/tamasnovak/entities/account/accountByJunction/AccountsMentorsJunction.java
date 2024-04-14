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
import net.tamasnovak.entities.account.accountByRole.Mentor;

import java.io.Serializable;

@Entity
@Table(name = "accounts_mentors_junction")
public final class AccountsMentorsJunction {
  @EmbeddedId
  private AccountsMentorsJunctionId id;

  @MapsId("account")
  @OneToOne
  @JoinColumn(name = "account_id")
  private Account account;

  @MapsId("mentor")
  @OneToOne
  @JoinColumn(name = "mentor_id")
  private Mentor mentor;

  protected AccountsMentorsJunction() {}

  public AccountsMentorsJunction(Account account, Mentor mentor) {
    this.account = account;
    this.mentor = mentor;
    this.id = new AccountsMentorsJunctionId(account.getId(), mentor.getId());
  }

  public Account getAccount() {
    return account;
  }

  public Mentor getMentor() {
    return mentor;
  }

  @Embeddable
  public static class AccountsMentorsJunctionId implements Serializable {
    @Column(name = "account_id")
    private long account;

    @Column(name = "mentor_id")
    private long mentor;

    public AccountsMentorsJunctionId() {}

    public AccountsMentorsJunctionId(long account, long mentor) {
      this.account = account;
      this.mentor = mentor;
    }

    public long getAccount() {
      return account;
    }

    public long getMentor() {
      return mentor;
    }
  }

  public AccountsMentorsJunctionId getId() {
    return id;
  }
}
