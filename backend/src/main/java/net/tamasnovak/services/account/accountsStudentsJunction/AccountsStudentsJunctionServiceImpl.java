package net.tamasnovak.services.account.accountsStudentsJunction;

import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.repositories.account.AccountsStudentsJunctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountsStudentsJunctionServiceImpl implements AccountsStudentsJunctionService {
  private final AccountsStudentsJunctionRepository accountsStudentsJunctionRepository;

  @Autowired
  public AccountsStudentsJunctionServiceImpl(AccountsStudentsJunctionRepository accountsStudentsJunctionRepository) {
    this.accountsStudentsJunctionRepository = accountsStudentsJunctionRepository;
  }

  @Override
  public Student findStudentByAccount(Account account) {
    return accountsStudentsJunctionRepository.findByAccountId(account).getStudent();
  }
}
