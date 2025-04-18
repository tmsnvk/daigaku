/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.role.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.common.entity.id.BaseExtendedIdEntity;
import org.hibernate.annotations.Immutable;

/**
 * Entity class that represents the roles database table.
 */
@Entity
@Immutable
@Table(name = "roles")
public final class Role extends BaseExtendedIdEntity {
  @Column(name = "name", unique = true, updatable = false, nullable = false)
  private String name;

  @OneToMany(mappedBy = "role")
  @JsonManagedReference(value = "role-account_reference")
  private List<Account> accounts;

  protected Role() {
    // There is no constructor as the roles table is never meant to be extended.
    // The values are stored in the database solely to satisfy data normalisation rules and to ease Spring's authentication and
    // authorisation process.
    // Cannot be private or package-private as it is an @Entity class.
  }

  public String getName() {
    return this.name;
  }

  /**
   * Fetches the role's name without its 'ROLE_' prefix.
   *
   * @return string.
   */
  public String fetchNameWithoutPrefix() {
    String[] splitByPrefix = this.name.split("ROLE_");

    return splitByPrefix[1].toLowerCase();
  }
}
