package net.tamasnovak.entities.account;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import net.tamasnovak.entities.BaseEntity;

@Entity
@Table(name = "pending_accounts")
public final class PendingAccount extends BaseEntity {
  @Column(name = "first_name", nullable = false)
  @NotBlank
  private String firstName;

  @Column(name = "last_name", nullable = false)
  @NotBlank
  private String lastName;

  @Column(name = "full_name", nullable = false)
  @NotBlank
  private String fullName;

  @Column(name = "email", unique = true, nullable = false)
  @Email
  private String email;

  public PendingAccount() {}

  public PendingAccount(String firstName, String lastName, String email) {
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

  public String getFullName() {
    return fullName;
  }

  public String getEmail() {
    return email;
  }
}
