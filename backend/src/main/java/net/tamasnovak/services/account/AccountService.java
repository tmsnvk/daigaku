package net.tamasnovak.services.account;

import net.tamasnovak.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public final class AccountService {
  private final PasswordEncoder encoder;
  private final AccountRepository accountRepository;

  @Autowired
  public AccountService(PasswordEncoder encoder, AccountRepository accountRepository) {
    this.encoder = encoder;
    this.accountRepository = accountRepository;
  }
}
