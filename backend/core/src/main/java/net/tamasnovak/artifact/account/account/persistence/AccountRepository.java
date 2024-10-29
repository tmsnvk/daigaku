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
  Optional<Account> findByEmail(String email);

  Optional<Account> findByUuid(UUID uuid);

  boolean existsByEmail(String email);
}
