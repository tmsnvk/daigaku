package net.tamasnovak.entities;

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
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@NoArgsConstructor
public final class Account {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private int id;

  @Column(name = "uuid")
  @org.hibernate.validator.constraints.UUID
  private UUID uuid;

  @Column(name = "registered_at")
  @PastOrPresent
  private Timestamp registeredAt;

  @Column(name = "last_updated_at")
  @PastOrPresent
  private Timestamp lastUpdatedAt;

  @Column(name = "first_name")
  @NotBlank
  private String firstName;

  @Column(name = "last_name")
  @NotBlank
  private String lastName;

  @Column(name = "email")
  @Email
  private String email;

  @Column(name = "hashed_password")
  @NotBlank
  private String hashedPassword;

  public Account(String firstName, String lastName, String email, String hashedPassword) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }
}
// TODO - add roles join table link
