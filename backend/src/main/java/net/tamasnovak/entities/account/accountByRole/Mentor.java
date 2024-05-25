package net.tamasnovak.entities.account.accountByRole;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.base.accountRole.BaseAccountRole;
import net.tamasnovak.entities.institution.Institution;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "mentors")
public final class Mentor extends BaseAccountRole {
  @OneToMany(mappedBy = "mentor")
  @JsonManagedReference(value = "mentor-student_reference")
  private List<Student> students;

  @ManyToOne
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference(value = "institution-mentor_reference")
  private Institution institution;

  protected Mentor() {}

  private Mentor(Account account) {
    super(account);
    this.students = new ArrayList<>();
  }

  public static Mentor createMentor(Account account) {
    return new Mentor(account);
  }

  public Institution getInstitution() {
    return institution;
  }
}
