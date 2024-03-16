package net.tamasnovak.entities.account;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.util.Set;

@Entity
@Table(name = "roles")
public final class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "name", unique = true, updatable = false, nullable = false)
  @NotBlank
  private String name;

  @ManyToMany(mappedBy = "roles")
  private Set<Account> users;

  public Role() {}

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public Set<Account> getUsers() {
    return users;
  }
}
