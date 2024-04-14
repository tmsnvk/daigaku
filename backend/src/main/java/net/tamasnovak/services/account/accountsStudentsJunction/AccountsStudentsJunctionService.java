package net.tamasnovak.services.account.accountsStudentsJunction;

import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.account.accountByRole.Student;

public interface AccountsStudentsJunctionService {
  Student findStudentByAccount(Account account);
}
