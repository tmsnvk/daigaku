package net.tamasnovak.artifact.account.pendingaccount.persistence;

import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingAccountRepository extends JpaRepository<PendingAccount, Long> {
  boolean existsByEmail(String email);
}
