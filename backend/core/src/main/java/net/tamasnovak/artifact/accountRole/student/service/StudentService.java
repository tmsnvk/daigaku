package net.tamasnovak.artifact.accountRole.student.service;

import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accountRole.student.entity.Student;

public interface StudentService {
  Student getByAccount(Account account);
}
