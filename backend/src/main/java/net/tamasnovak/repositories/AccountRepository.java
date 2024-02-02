package net.tamasnovak.repositories;

import net.tamasnovak.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer> {

}
