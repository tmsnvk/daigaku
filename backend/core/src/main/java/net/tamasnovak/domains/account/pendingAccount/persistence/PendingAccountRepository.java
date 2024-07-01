package net.tamasnovak.domains.account.pendingAccount.persistence;

import net.tamasnovak.domains.account.pendingAccount.models.entity.PendingAccount;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingAccountRepository extends JpaRepository<PendingAccount, Long> {
  boolean existsByEmail(String email);
}
