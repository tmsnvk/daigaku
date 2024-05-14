package net.tamasnovak.entities.role;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.base.id.BaseSimpleIdEntity;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public final class Role extends BaseSimpleIdEntity {
  @Column(name = "name", unique = true, updatable = false, nullable = false)
  private String name;

  @OneToMany(mappedBy = "role")
  @JsonManagedReference
  private Set<Account> accounts;

  protected Role() {}

  private Role(String name) {
    this.name = name;
    this.accounts = new HashSet<>();
  }

  public static Role createRole(String name) {
    return new Role(name);
  }

  public String getName() {
    return name;
  }

  public void addAccount(Account account) {
    accounts.add(account);
  }
}
