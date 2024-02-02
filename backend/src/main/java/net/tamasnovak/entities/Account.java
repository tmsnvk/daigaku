package net.tamasnovak.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
public class Account {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "uuid")
  private UUID uuid;

  @Column(name = "registered_at")
  private Timestamp registeredAt;

  @Column(name = "last_updated_at")
  private Timestamp lastUpdatedAt;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "email")
  private String email;

  @Column(name = "hashed_password")
  private String hashedPassword;

  public Account(String firstName, String lastName, String email, String hashedPassword) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }
}
// TODO - add roles join table link
