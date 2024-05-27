package net.tamasnovak.services.account.accountByRole.student;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.repositories.account.accountByRole.StudentRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.services.account.accountByRole.AccountRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService implements StudentCoreService, AccountRoleService<Student> {
  private final StudentRepository studentRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public StudentService(StudentRepository studentRepository, GlobalServiceConstants globalServiceConstants) {
    this.studentRepository = studentRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public Student getAccountRoleByAccount(Account account) {
    return studentRepository.findByAccount(account)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
