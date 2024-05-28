package net.tamasnovak.repositories.account.accountByRole;


import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountByRole.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
  Optional<Student> findByAccount(Account account);
}
