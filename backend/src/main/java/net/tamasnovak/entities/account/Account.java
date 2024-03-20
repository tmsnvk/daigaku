package net.tamasnovak.entities.account;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import net.tamasnovak.entities.BaseEntity;
import net.tamasnovak.entities.application.Application;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "accounts")
public final class Account extends BaseEntity {
  @Column(name = "first_name", nullable = false)
  @NotBlank
  private String firstName;

  @Column(name = "last_name", nullable = false)
  @NotBlank
  private String lastName;

  @Column(name = "email", unique = true, nullable = false)
  @Email
  private String email;

  @Column(name = "hashed_password", nullable = false)
  @NotBlank
  private String hashedPassword;

  @OneToMany(mappedBy = "accountId")
  @JsonManagedReference
  private Set<Application> applications;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinTable(
    name = "accounts_roles_join",
    joinColumns = { @JoinColumn(name = "account_id") },
    inverseJoinColumns = { @JoinColumn(name = "role_id") }
  )
  private Role role;

  public Account() {}

  public Account(String firstName, String lastName, String email, String hashedPassword, Role role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.role = role;
    this.applications = new HashSet<>();
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public String getEmail() {
    return email;
  }

  public String getHashedPassword() {
    return hashedPassword;
  }

  public Set<Application> getApplications() {
    return applications;
  }

  public Role getRole() {
    return role;
  }
}
