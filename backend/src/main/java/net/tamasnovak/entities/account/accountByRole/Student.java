package net.tamasnovak.entities.account.accountByRole;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.base.id.BaseSimpleIdEntity;
import net.tamasnovak.entities.institution.Institution;

@Entity
@Table(name = "students")
public final class Student extends BaseSimpleIdEntity {
  @OneToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  @JsonManagedReference
  private Account account;

  @ManyToOne
  @JoinColumn(name = "mentor_id", nullable = false)
  @JsonBackReference
  private Mentor mentor;

  @ManyToOne
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference
  private Institution institution;

  protected Student() {}

  public Student(Account account, Mentor mentor) {
    this.account = account;
    this.mentor = mentor;
  }

  public Account getAccount() {
    return account;
  }

  public Mentor getMentor() {
    return mentor;
  }

  public Institution getInstitution() {
    return institution;
  }
}
