package net.tamasnovak.services.account;

import net.tamasnovak.entities.Account;
import net.tamasnovak.exception.FormErrorException;
import net.tamasnovak.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
  private final PasswordEncoder encoder;
  private final AccountRepository accountRepository;
  private final AccountServiceMessages accountServiceMessages;

  @Autowired
  public AccountService(PasswordEncoder encoder, AccountRepository accountRepository, AccountServiceMessages accountServiceMessages) {
    this.encoder = encoder;
    this.accountRepository = accountRepository;
    this.accountServiceMessages = accountServiceMessages;
  }

  public void checkEmailInDatabase(String email) {
    Optional<Account> account = accountRepository.findByEmail(email);

    if (account.isPresent()) {
      throw new FormErrorException(accountServiceMessages.EMAIL_ALREADY_EXISTS);
    }
  }
}
