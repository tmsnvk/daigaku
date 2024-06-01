package net.tamasnovak.domains.account.account.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.account.account.models.dtoRequests.LoginRequestDto;
import net.tamasnovak.domains.account.account.models.dtoResponses.ClientAuthContextDto;
import net.tamasnovak.domains.account.account.models.dtoResponses.LoginReturnDto;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.account.account.persistence.AccountRepository;
import net.tamasnovak.security.utilities.JwtUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "AccountService")
public class AccountServiceImpl implements AccountService {
  private final AccountRepository accountRepository;
  private final AccountConstants accountConstants;
  private final JwtUtilities jwtUtilities;

  @Autowired
  public AccountServiceImpl(AccountRepository accountRepository, AccountConstants accountConstants, JwtUtilities jwtUtilities) {
    this.accountRepository = accountRepository;
    this.accountConstants = accountConstants;
    this.jwtUtilities = jwtUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public Account getByEmail(String email) {
    return accountRepository.findByEmail(email)
      .orElseThrow(() -> new EntityNotFoundException(accountConstants.ACCOUNT_NOT_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public ClientAuthContextDto getClientAuthContextDto(String email) {
    Account account = getByEmail(email);

    return account.getAuthContext();
  }

  @Override
  @Transactional(readOnly = true)
  public LoginReturnDto getLoginReturnDto(LoginRequestDto requestBody, Authentication authentication) {
    Account account = getByEmail(requestBody.email().toLowerCase());
    String jwtToken = jwtUtilities.generateJwtToken(authentication);

    return account.getLoginData(jwtToken);
  }

  @Override
  @Transactional(readOnly = true)
  public void verifyAccountNotExistsByEmail(String email) {
    boolean isAccountExists = accountRepository.existsByEmail(email);

    if (isAccountExists) {
      throw new DataIntegrityViolationException(accountConstants.EMAIL_ALREADY_EXISTS);
    }
  }
}
