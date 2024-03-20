package net.tamasnovak.services.account.account;

import net.tamasnovak.entities.account.Account;
import net.tamasnovak.exceptions.FormErrorException;
import net.tamasnovak.repositories.AccountRepository;
import net.tamasnovak.services.account.AccountConstraintValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AccountService implements AccountConstraintValidator {
  private final PasswordEncoder encoder;
  private final AccountRepository accountRepository;
  private final AccountServiceMessages accountServiceMessages;

  @Autowired
  public AccountService(PasswordEncoder encoder, AccountRepository accountRepository, AccountServiceMessages accountServiceMessages) {
    this.encoder = encoder;
    this.accountRepository = accountRepository;
    this.accountServiceMessages = accountServiceMessages;
  }

  @Override
  @Transactional(readOnly = true)
  public void checkIfExistsByEmail(String email) {
    boolean isAccountExists = accountRepository.existsByEmail(email);

    if (isAccountExists) {
      throw new DataIntegrityViolationException(accountServiceMessages.EMAIL_ALREADY_EXISTS);
    }
  }

  @Transactional(readOnly = true)
  public Account findUserByEmail(String email) {
    Optional<Account> account = accountRepository.findByEmail(email);

    if (account.isEmpty()) {
      throw new FormErrorException("This email address is not registered in our database.");
    }

    return account.get();
  }
}
