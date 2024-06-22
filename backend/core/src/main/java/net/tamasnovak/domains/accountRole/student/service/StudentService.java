package net.tamasnovak.domains.accountRole.student.service;

import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.accountRole.student.models.entity.Student;

public interface StudentService {
  Student getByAccount(Account account);
}
