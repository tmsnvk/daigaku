package net.tamasnovak.entities.institution;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
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

import java.util.Set;

@Entity
@Table(name = "institutions")
public final class Institution extends Auditable {
  @Column(name = "name", nullable = false)
  @NotBlank(message = "Provide the institution's name.")
  private String name;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "address_id", referencedColumnName = "id")
  private Address address;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference
  private Set<PendingAccount> pendingAccounts;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference
  private Set<Student> students;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference
  private Set<Mentor> mentors;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference
  private Set<InstitutionAdmin> institutionAdmins;

  protected Institution() {}

  public Institution(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public Address getAddress() {
    return address;
  }

  public Set<PendingAccount> getPendingAccounts() {
    return pendingAccounts;
  }

  public Set<Student> getStudents() {
    return students;
  }

  public Set<Mentor> getMentors() {
    return mentors;
  }

  public Set<InstitutionAdmin> getInstitutionAdmins() {
    return institutionAdmins;
  }
}
