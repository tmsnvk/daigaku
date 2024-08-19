package net.tamasnovak.domain.account.account.persistence;

import net.tamasnovak.domain.account.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, Long> {
  Optional<Account> findByEmail(String email);

  Optional<Account> findByUuid(UUID uuid);

  boolean existsByEmail(String email);
}
