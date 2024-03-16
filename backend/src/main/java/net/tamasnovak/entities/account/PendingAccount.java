package net.tamasnovak.entities.account;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "pending_account_registrations")
public final class PendingAccount {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private long id;

  @Column(name = "registered_at", updatable = false, nullable = false)
  @CreationTimestamp
  @PastOrPresent
  private Timestamp registeredAt;

  @Column(name = "first_name", nullable = false)
  @NotBlank
  private String firstName;

  @Column(name = "last_name", nullable = false)
  @NotBlank
  private String lastName;

  @Column(name = "email", unique = true, nullable = false)
  @Email
  private String email;

  public PendingAccount() {}

  public PendingAccount(String firstName, String lastName, String email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  public long getId() {
    return id;
  }

  public Timestamp getRegisteredAt() {
    return registeredAt;
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
