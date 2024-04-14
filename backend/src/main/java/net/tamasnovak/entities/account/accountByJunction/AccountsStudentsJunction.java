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

  @MapsId("account")
  @OneToOne
  @JoinColumn(name = "account_id")
  private Account account;

  @MapsId("student")
  @OneToOne
  @JoinColumn(name = "student_id")
  private Student student;

  protected AccountsStudentsJunction() {}

  public AccountsStudentsJunction(Account account, Student student) {
    this.account = account;
    this.student = student;
    this.id = new AccountsStudentsJunctionId(account.getId(), student.getId());
  }

  public Account getAccount() {
    return account;
  }

  public Student getStudent() {
    return student;
  }

  @Embeddable
  public static class AccountsStudentsJunctionId implements Serializable {
    @Column(name = "account_id")
    private long account;

    @Column(name = "student_id")
    private long student;

    public AccountsStudentsJunctionId() {}

    public AccountsStudentsJunctionId(long account, long student) {
      this.account = account;
      this.student = student;
    }

    public long getAccount() {
      return account;
    }

    public long getStudent() {
      return student;
    }
  }

  public AccountsStudentsJunctionId getId() {
    return id;
  }
}
