package net.tamasnovak.repositories.account.baseAccount;

import net.tamasnovak.entities.account.baseAccount.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
  Optional<Account> findByEmail(String email);

  boolean existsByEmail(String email);
}
