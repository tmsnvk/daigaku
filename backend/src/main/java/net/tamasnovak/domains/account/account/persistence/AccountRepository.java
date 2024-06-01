package net.tamasnovak.domains.account.account.persistence;

import net.tamasnovak.domains.account.account.models.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
  Optional<Account> findByEmail(String email);

  boolean existsByEmail(String email);
}
