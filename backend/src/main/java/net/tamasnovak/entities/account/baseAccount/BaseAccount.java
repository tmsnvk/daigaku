package net.tamasnovak.entities.account.baseAccount;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import net.tamasnovak.entities.base.audit.Auditable;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.utilities.StringFormatterUtilities;

@MappedSuperclass
public abstract class BaseAccount extends Auditable {
  @Column(name = "first_name", nullable = false)
  @NotBlank(message = "Provide a first name.")
  @Size(min = 2, max = 100, message = "First name(s) should be between 2 and 100 characters long.")
  private String firstName;

  @Column(name = "last_name", nullable = false)
  @NotBlank(message = "Provide a first name.")
  @Size(min = 2, max = 100, message = "Last name(s) should be between 2 and 100 characters long.")
  private String lastName;

  @Column(name = "email", unique = true, nullable = false)
  @Email(message = "Provide a valid email address.")
  private String email;

  @ManyToOne
  @JoinColumn(name = "role_id")
  @JsonBackReference
  private Role role;

  protected BaseAccount() {}

  public BaseAccount(String firstName, String lastName, String email, Role role) {
    this.firstName = capitaliseNameField(firstName);
    this.lastName = capitaliseNameField(lastName);
    this.email = lowerCaseEmail(email);
    this.role = role;
  }

  private static String capitaliseNameField(String name) {
    return StringFormatterUtilities.capitaliseWord(name);
  }

  private static String lowerCaseEmail(String email) {
    return email.trim().toLowerCase();
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

  public Role getRole() {
    return role;
  }
}
