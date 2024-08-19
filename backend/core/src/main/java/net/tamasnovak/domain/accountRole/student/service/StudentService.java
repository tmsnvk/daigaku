package net.tamasnovak.domain.accountRole.student.service;

import net.tamasnovak.domain.account.account.entity.Account;
import net.tamasnovak.domain.accountRole.student.entity.Student;

public interface StudentService {
  Student getByAccount(Account account);
}
