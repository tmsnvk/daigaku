package net.tamasnovak.services.account.accountsStudentsJunction;

import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountsByRole.Student;

public interface AccountsStudentsJunctionService {
  Student findStudentByAccount(Account account);
}
