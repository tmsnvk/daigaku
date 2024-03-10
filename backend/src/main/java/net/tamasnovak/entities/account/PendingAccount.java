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
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "pending_account_registrations")
@Getter
@NoArgsConstructor
public final class PendingAccount {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private long id;

  @Column(name = "registered_at")
  @CreationTimestamp
  @PastOrPresent
  private Timestamp registeredAt;

  @Column(name = "first_name")
  @NotBlank
  private String firstName;

  @Column(name = "last_name")
  @NotBlank
  private String lastName;

  @Column(name = "email")
  @Email
  private String email;

  public PendingAccount(String firstName, String lastName, String email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
