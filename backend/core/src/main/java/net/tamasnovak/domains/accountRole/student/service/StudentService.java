package net.tamasnovak.domains.accountRole.student.service;

import net.tamasnovak.domains.account.account.entity.Account;
import net.tamasnovak.domains.accountRole.student.entity.Student;

public interface StudentService {
  Student getByAccount(Account account);
}
