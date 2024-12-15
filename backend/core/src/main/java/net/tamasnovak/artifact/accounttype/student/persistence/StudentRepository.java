/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.student.persistence;

import java.util.Optional;

import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link Student} entities.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface StudentRepository extends JpaRepository<Student, Long> {
  Optional<Student> findStudentByAccount(Account account);
}
