package net.tamasnovak.services.account.account;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.repositories.account.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountServiceImpl implements AccountService {
  private final AccountRepository accountRepository;
  private final AccountServiceConstants accountServiceConstants;

  @Autowired
  public AccountServiceImpl(AccountRepository accountRepository, AccountServiceConstants accountServiceConstants) {
    this.accountRepository = accountRepository;
    this.accountServiceConstants = accountServiceConstants;
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
    return accountRepository.findByEmail(email)
      .orElseThrow(() -> new EntityNotFoundException(accountServiceConstants.USER_NOT_FOUND));
  }
}
