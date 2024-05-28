package net.tamasnovak.services.account.accountRole.student;

import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountByRole.Student;

public interface StudentService {
  Student getAccountRoleByAccount(Account account);
}
