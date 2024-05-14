package net.tamasnovak.services.role.student;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.repositories.role.StudentRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
  public Student getStudentByAccount(
    Account account
  ) {
    return studentRepository.findByAccount(account)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
