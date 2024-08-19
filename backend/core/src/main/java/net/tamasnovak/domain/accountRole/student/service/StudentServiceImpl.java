package net.tamasnovak.domain.accountRole.student.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domain.account.account.entity.Account;
import net.tamasnovak.domain.accountRole.student.entity.Student;
import net.tamasnovak.domain.accountRole.student.persistence.StudentRepository;
import net.tamasnovak.domain.shared.constants.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "StudentService")
public class StudentServiceImpl implements StudentService {
  private final StudentRepository studentRepository;
  private final GlobalServiceConstants globalConstants;

  @Autowired
  public StudentServiceImpl(StudentRepository studentRepository, GlobalServiceConstants globalConstants) {
    this.studentRepository = studentRepository;
    this.globalConstants = globalConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public Student getByAccount(final Account account) {
    return studentRepository.findByAccount(account)
      .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));
  }
}
