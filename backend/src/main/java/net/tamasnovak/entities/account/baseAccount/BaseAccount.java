package net.tamasnovak.entities.account.baseAccount;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import net.tamasnovak.entities.base.audit.Auditable;
import net.tamasnovak.entities.base.id.BaseExtendedIdEntity;

@MappedSuperclass
public abstract class BaseAccount extends Auditable<BaseExtendedIdEntity>  {
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

  protected BaseAccount() {}

  public BaseAccount(String firstName, String lastName, String email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
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
}
