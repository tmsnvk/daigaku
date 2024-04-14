package net.tamasnovak.entities.role;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.baseAccount.Account;

import java.util.Set;

@Entity
@Table(name = "roles")
public final class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true, updatable = false, nullable = false)
  private long id;

  @Column(name = "name", unique = true, updatable = false, nullable = false)
  private String name;

  @OneToMany(mappedBy = "role")
  @JsonManagedReference
  private Set<Account> accounts;

  public Role() {}

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }
}
