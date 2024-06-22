package net.tamasnovak.domains.accountRole.student.persistence;


import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.accountRole.student.models.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
  Optional<Student> findByAccount(Account account);
}
