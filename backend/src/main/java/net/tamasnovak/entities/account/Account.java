package net.tamasnovak.entities.account;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import net.tamasnovak.entities.application.Application;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "accounts")
public final class Account {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private long id;

  @Column(name = "uuid", updatable = false, nullable = false)
  @org.hibernate.validator.constraints.UUID
  private UUID uuid;

  @Column(name = "registered_at", updatable = false, nullable = false)
  @PastOrPresent
  private Timestamp registeredAt;

  @Column(name = "last_updated_at", nullable = false)
  @PastOrPresent
  private Timestamp lastUpdatedAt;

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

  public long getId() {
    return id;
  }

  public UUID getUuid() {
    return uuid;
  }

  public Timestamp getRegisteredAt() {
    return registeredAt;
  }

  public Timestamp getLastUpdatedAt() {
    return lastUpdatedAt;
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
