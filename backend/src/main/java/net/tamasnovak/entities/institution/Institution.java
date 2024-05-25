package net.tamasnovak.entities.institution;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import net.tamasnovak.entities.account.accountByRole.InstitutionAdmin;
import net.tamasnovak.entities.account.accountByRole.Mentor;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.account.baseAccount.PendingAccount;
import net.tamasnovak.entities.address.Address;
import net.tamasnovak.entities.base.audit.Auditable;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "institutions")
public final class Institution extends Auditable {
  @Column(name = "name", nullable = false)
  @NotBlank(message = "Provide the institution's name.")
  private String name;

  @OneToOne
  @JoinColumn(name = "address_id", referencedColumnName = "id")
  private Address address;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference(value = "institution_account_reference")
  private List<PendingAccount> pendingAccounts;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference(value = "institution_student_reference")
  private List<Student> students;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference(value = "institution_mentor_reference")
  private List<Mentor> mentors;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference(value = "institution_institution_admin_reference")
  private List<InstitutionAdmin> institutionAdmins;

  protected Institution() {}

  private Institution(String name, Address address) {
    this.name = name;
    this.address = address;
    this.pendingAccounts = new ArrayList<>();
    this.students = new ArrayList<>();
    this.mentors = new ArrayList<>();
    this.institutionAdmins = new ArrayList<>();
  }

  public static Institution createInstitution(String name, Address address) {
    return new Institution(name, address);
  }

  public String getName() {
    return name;
  }

  public Address getAddress() {
    return address;
  }
}
