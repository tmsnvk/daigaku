package net.tamasnovak.entities.role;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.base.id.BaseExtendedIdEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roles")
public final class Role extends BaseExtendedIdEntity {
  @Column(name = "name", unique = true, updatable = false, nullable = false)
  private String name;

  @OneToMany(mappedBy = "role")
  @JsonManagedReference(value = "role-account_reference")
  private List<Account> accounts;

  protected Role() {}

  private Role(String name) {
    this.name = name;
    this.accounts = new ArrayList<>();
  }

  public static Role createRole(String name) {
    return new Role(name);
  }

  public String getName() {
    return name;
  }
}
