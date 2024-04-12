package net.tamasnovak.entities.account;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import net.tamasnovak.entities.BaseEntity;
import net.tamasnovak.entities.role.Role;

@Entity
@Table(name = "accounts")
public class Account extends BaseEntity {
  @Column(name = "first_name", nullable = false)
  @NotBlank(message = "Provide a first name.")
  @Size(min = 2, max = 100, message = "First name(s) should be between 2 and 100 characters long.")
  private String firstName;

  @Column(name = "last_name", nullable = false)
  @NotBlank(message = "Provide a last name.")
  @Size(min = 2, max = 100, message = "First name(s) should be between 2 and 100 characters long.")
  private String lastName;

  @Column(name = "full_name", nullable = false)
  private String fullName;

  @Column(name = "email", unique = true, nullable = false)
  @Email(message = "Provide a valid email address.")
  private String email;

  @Column(name = "hashed_password", nullable = false)
  private String hashedPassword;

  @ManyToOne
  @JoinColumn(name = "role_id")
  @JsonBackReference
  private Role roleId;

  protected Account() {}

  public Account(String firstName, String lastName, String email, String hashedPassword, Role role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.roleId = role;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public String getFullName() {
    return fullName;
  }

  public String getEmail() {
    return email;
  }

  public String getHashedPassword() {
    return hashedPassword;
  }

  public Role getRoleId() {
    return roleId;
  }
}
