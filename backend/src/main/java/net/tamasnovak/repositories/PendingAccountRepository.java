package net.tamasnovak.repositories;

import net.tamasnovak.entities.PendingAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface PendingAccountRepository extends JpaRepository<PendingAccount, Integer> {
  Optional<PendingAccount> findByEmail(String email);
}