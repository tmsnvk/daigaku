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

  @MapsId("accountId")
  @OneToOne
  @JoinColumn(name = "account_id")
  private Account accountId;

  @MapsId("mentorId")
  @OneToOne
  @JoinColumn(name = "mentor_id")
  private Mentor mentorId;

  public AccountsMentorsJunction() {}

  public AccountsMentorsJunction(Account accountId, Mentor mentorId) {
    this.accountId = accountId;
    this.mentorId = mentorId;
    this.id = new AccountsMentorsJunctionId(accountId.getId(), mentorId.getId());
  }

  public Account getAccountId() {
    return accountId;
  }

  public Mentor getMentorId() {
    return mentorId;
  }

  @Embeddable
  public static class AccountsMentorsJunctionId implements Serializable {
    @Column(name = "account_id")
    private long accountId;

    @Column(name = "mentor_id")
    private long mentorId;

    public AccountsMentorsJunctionId() {}

    public AccountsMentorsJunctionId(long accountId, long mentorId) {
      this.accountId = accountId;
      this.mentorId = mentorId;
    }

    public long getAccountId() {
      return accountId;
    }

    public long getMentorId() {
      return mentorId;
    }
  }

  public AccountsMentorsJunctionId getId() {
    return id;
  }
}
