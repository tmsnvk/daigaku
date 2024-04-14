package net.tamasnovak.entities.account.accountByRole;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.baseAccount.Account;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "mentors")
public final class Mentor {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true, insertable = false, updatable = false, nullable = false)
  private long id;

  @OneToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  @JsonManagedReference
  private Account accountId;

  @OneToMany(mappedBy = "mentorId")
  private Set<Student> students;

  public Mentor() {}

  public Mentor(Account accountId) {
    this.accountId = accountId;
    this.students = new HashSet<>();
  }

  public long getId() {
    return id;
  }

  public Account getAccountId() {
    return accountId;
  }

  public Set<Student> getStudents() {
    return students;
  }
}
