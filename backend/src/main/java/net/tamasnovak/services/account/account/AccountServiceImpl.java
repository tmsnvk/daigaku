package net.tamasnovak.services.account.account;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.repositories.account.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountServiceImpl implements AccountService {
  private final AccountRepository accountRepository;
  private final AccountConstants accountConstants;

  @Autowired
  public AccountServiceImpl(AccountRepository accountRepository, AccountConstants accountConstants) {
    this.accountRepository = accountRepository;
    this.accountConstants = accountConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public void checkIfExistsByEmail(String email) {
    boolean isAccountExists = accountRepository.existsByEmail(email);

    if (isAccountExists) {
      throw new DataIntegrityViolationException(accountConstants.EMAIL_ALREADY_EXISTS);
    }
  }

  @Override
  @Transactional(readOnly = true)
  public Account findByEmail(String email) {
    return accountRepository.findByEmail(email)
      .orElseThrow(() -> new EntityNotFoundException(accountConstants.ACCOUNT_NOT_FOUND));
  }
}
