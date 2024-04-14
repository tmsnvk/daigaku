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
import net.tamasnovak.entities.account.accountByRole.Student;

import java.io.Serializable;

@Entity
@Table(name = "accounts_students_junction")
public final class AccountsStudentsJunction {
  @EmbeddedId
  private AccountsStudentsJunctionId id;

  @MapsId("accountId")
  @OneToOne
  @JoinColumn(name = "account_id")
  private Account accountId;

  @MapsId("studentId")
  @OneToOne
  @JoinColumn(name = "student_id")
  private Student studentId;

  public AccountsStudentsJunction() {}

  public AccountsStudentsJunction(Account accountId, Student studentId) {
    this.accountId = accountId;
    this.studentId = studentId;
    this.id = new AccountsStudentsJunctionId(accountId.getId(), studentId.getId());
  }

  public Account getAccountId() {
    return accountId;
  }

  public Student getStudentId() {
    return studentId;
  }

  @Embeddable
  public static class AccountsStudentsJunctionId implements Serializable {
    @Column(name = "account_id")
    private long accountId;

    @Column(name = "student_id")
    private long studentId;

    public AccountsStudentsJunctionId() {}

    public AccountsStudentsJunctionId(long accountId, long studentId) {
      this.accountId = accountId;
      this.studentId = studentId;
    }

    public long getAccountId() {
      return accountId;
    }

    public long getStudentId() {
      return studentId;
    }
  }

  public AccountsStudentsJunctionId getId() {
    return id;
  }
}
