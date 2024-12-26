/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.persistence;

import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.account.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link Account} entities.
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface AccountRepository extends JpaRepository<Account, Long> {
  Optional<Account> findAccountByEmail(String email);

  Optional<Account> findAccountByUuid(UUID uuid);

  boolean existsAccountByEmail(String email);
}
