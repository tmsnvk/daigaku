package net.tamasnovak.repositories;

import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.application.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
  Optional<List<Application>> findAllByAccountId(Account accountId);

}
