package net.tamasnovak.entities.account.accountByRole;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.base.id.BaseSimpleIdEntity;
import net.tamasnovak.entities.institution.Institution;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "mentors")
public final class Mentor extends BaseSimpleIdEntity {
  @OneToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  @JsonManagedReference
  private Account account;

  @OneToMany(mappedBy = "mentor")
  private Set<Student> students;

  @ManyToMany(mappedBy = "mentors")
  @JsonBackReference
  private Set<Institution> institutions;

  protected Mentor() {}

  public Mentor(Account account) {
    this.account = account;
    this.students = new HashSet<>();
  }

  public Account getAccount() {
    return account;
  }

  public Set<Student> getStudents() {
    return students;
  }

  public Set<Institution> getInstitutions() {
    return institutions;
  }
}
