package net.tamasnovak.repositories.account;

import net.tamasnovak.entities.account.baseAccount.PendingAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface PendingAccountRepository extends JpaRepository<PendingAccount, Long> {
  boolean existsByEmail(String email);
}
