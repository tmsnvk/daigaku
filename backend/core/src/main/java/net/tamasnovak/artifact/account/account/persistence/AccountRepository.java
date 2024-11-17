/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface AccountRepository extends JpaRepository<Account, Long> {
  Optional<Account> findAccountByEmail(String email);

  Optional<Account> findAccountByUuid(UUID uuid);

  boolean existsAccountByEmail(String email);
}
