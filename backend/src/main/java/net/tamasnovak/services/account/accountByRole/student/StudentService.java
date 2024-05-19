package net.tamasnovak.services.account.accountByRole.student;

import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.account.baseAccount.Account;

public interface StudentService {
  Student getStudentByAccount(Account account);
}
