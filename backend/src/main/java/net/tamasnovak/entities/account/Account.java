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
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.tamasnovak.entities.application.Application;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "accounts")
@Getter
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

  @OneToMany(mappedBy = "accountId")
  @JsonManagedReference
  private List<Application> applications;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "accounts_roles_join",
    joinColumns = { @JoinColumn(name = "account_id") },
    inverseJoinColumns = { @JoinColumn(name = "role_id") }
  )
  private Set<Role> roles;

  public Account(String firstName, String lastName, String email, String hashedPassword, Set<Role> roles) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.roles = roles;
    this.applications = new ArrayList<>();
  }
}
