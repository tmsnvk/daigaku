package net.tamasnovak.domains.accountRole.student.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.accountRole.student.models.entity.Student;
import net.tamasnovak.domains.accountRole.student.persistence.StudentRepository;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentServiceImpl implements StudentService {
  private final StudentRepository studentRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public StudentServiceImpl(StudentRepository studentRepository, GlobalServiceConstants globalServiceConstants) {
    this.studentRepository = studentRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public Student getByAccount(Account account) {
    return studentRepository.findByAccount(account)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
