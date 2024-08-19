package net.tamasnovak.domain.accountRole.student.persistence;


import net.tamasnovak.domain.account.account.entity.Account;
import net.tamasnovak.domain.accountRole.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
  Optional<Student> findByAccount(Account account);
}
