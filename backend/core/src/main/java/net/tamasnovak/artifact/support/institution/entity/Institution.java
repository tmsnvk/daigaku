package net.tamasnovak.artifact.support.institution.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import net.tamasnovak.artifact.accounttype.institutionadmin.entity.InstitutionAdmin;
import net.tamasnovak.artifact.accounttype.mentor.entity.Mentor;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.address.entity.Address;
import net.tamasnovak.artifact.support.shared.entity.BaseSupportEntity;

@Entity
@Table(name = "institutions")
public final class Institution extends BaseSupportEntity {
  @OneToOne
  @JoinColumn(name = "address_id", referencedColumnName = "id")
  private Address address;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference(value = "institution-account_reference")
  private List<PendingAccount> pendingAccounts;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference(value = "institution-student_reference")
  private List<Student> students;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference(value = "institution-mentor_reference")
  private List<Mentor> mentors;

  @OneToMany(mappedBy = "institution")
  @JsonManagedReference(value = "institution-institution_admin_reference")
  private List<InstitutionAdmin> institutionAdmins;

  protected Institution() {
  }

  private Institution(String name, Address address) {
    super(name);
    this.address = address;
    this.pendingAccounts = new ArrayList<>();
    this.students = new ArrayList<>();
    this.mentors = new ArrayList<>();
    this.institutionAdmins = new ArrayList<>();
  }

  public static Institution createInstitution(final String name, final Address address) {
    return new Institution(name, address);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, id, uuid);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    Institution that = (Institution) o;
    return Objects.equals(name, that.name) && Objects.equals(id, that.id) && Objects.equals(uuid, that.uuid);
  }
}
