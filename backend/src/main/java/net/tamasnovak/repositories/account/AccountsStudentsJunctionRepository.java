package net.tamasnovak.repositories.account;

import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountsByJunction.AccountsStudentsJunction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountsStudentsJunctionRepository extends JpaRepository<AccountsStudentsJunction, Long> {
  AccountsStudentsJunction findByAccountId(Account accountId);
}
