package net.tamasnovak.entities.account.accountsByRole;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.Account;

@Entity
@Table(name = "students")
public final class Student {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true, insertable = false, updatable = false, nullable = false)
  private long id;

  @OneToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  @JsonManagedReference
  private Account accountId;

  @ManyToOne
  @JoinColumn(name = "mentor_id")
  private Mentor mentorId;

  public Student() {}

  public Student(Account accountId, Mentor mentor) {
    this.accountId = accountId;
    this.mentorId = mentor;
  }

  public long getId() {
    return id;
  }

  public Account getAccountId() {
    return accountId;
  }

  public Mentor getMentorId() {
    return mentorId;
  }
}
