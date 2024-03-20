package net.tamasnovak.services.account.account;

import net.tamasnovak.entities.account.Account;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundConstants;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundException;
import net.tamasnovak.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {
  private final PasswordEncoder encoder;
  private final AccountRepository accountRepository;
  private final AccountServiceConstants accountServiceConstants;
  private final DbResourceNotFoundConstants dbResourceNotFoundConstants;

  @Autowired
  public AccountServiceImpl(PasswordEncoder encoder, AccountRepository accountRepository, AccountServiceConstants accountServiceConstants, DbResourceNotFoundConstants dbResourceNotFoundConstants) {
    this.encoder = encoder;
    this.accountRepository = accountRepository;
    this.accountServiceConstants = accountServiceConstants;
    this.dbResourceNotFoundConstants = dbResourceNotFoundConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public void checkIfExistsByEmail(String email) {
    boolean isAccountExists = accountRepository.existsByEmail(email);

    if (isAccountExists) {
      throw new DataIntegrityViolationException(accountServiceConstants.EMAIL_ALREADY_EXISTS);
    }
  }

  @Override
  @Transactional(readOnly = true)
  public Account findUserByEmail(String email) {
    Optional<Account> account = accountRepository.findByEmail(email);

    if (account.isEmpty()) {
      throw new DbResourceNotFoundException(dbResourceNotFoundConstants.USER_NOT_FOUND);
    }

    return account.get();
  }
}
