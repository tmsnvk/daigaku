/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.student.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.accounttype.student.persistence.StudentRepository;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link Student} entity-related operations, implementing {@link StudentService}.
 */
@Service
@Qualifier(value = "StudentService")
public class StudentServiceImpl implements StudentService {
  private final StudentRepository studentRepository;

  @Autowired
  public StudentServiceImpl(StudentRepository studentRepository) {
    this.studentRepository = studentRepository;
  }

  @Override
  @Transactional(readOnly = true)
  public Student findStudentByAccount(final Account account) {
    return studentRepository.findStudentByAccount(account)
                            .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }
}
