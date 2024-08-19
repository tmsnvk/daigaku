package net.tamasnovak.artifact.account.account.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.dto.LoginRequest;
import net.tamasnovak.artifact.account.account.dto.ClientAuthContext;
import net.tamasnovak.artifact.account.account.dto.LoginResponse;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.account.account.persistence.AccountRepository;
import net.tamasnovak.security.utilities.JwtUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Qualifier(value = "AccountService")
public class AccountServiceImpl implements AccountService {
  private final AccountRepository accountRepository;
  private final AccountServiceConstants accountServiceConstants;
  private final JwtUtilities jwtUtilities;

  @Autowired
  public AccountServiceImpl(AccountRepository accountRepository, AccountServiceConstants accountServiceConstants, JwtUtilities jwtUtilities) {
    this.accountRepository = accountRepository;
    this.accountServiceConstants = accountServiceConstants;
    this.jwtUtilities = jwtUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public Account getByEmail(final String email) {
    return accountRepository.findByEmail(email)
      .orElseThrow(() -> new EntityNotFoundException(accountServiceConstants.ACCOUNT_NOT_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public Account getByUuid(final UUID accountUuid) {
    return accountRepository.findByUuid(accountUuid)
      .orElseThrow(() -> new EntityNotFoundException(accountServiceConstants.ACCOUNT_NOT_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public ClientAuthContext getClientAuthContextDto(final String email) {
    final Account account = getByEmail(email);

    return account.getAuthContext();
  }

  @Override
  @Transactional(readOnly = true)
  public LoginResponse getLoginReturnDto(final LoginRequest requestBody, final Authentication authentication) {
    final Account account = getByEmail(requestBody.email().toLowerCase());
    final String jwtToken = jwtUtilities.generateJwtToken(authentication);

    return account.getLoginData(jwtToken);
  }

  @Override
  @Transactional(readOnly = true)
  public void verifyAccountNotExistsByEmail(final String email) {
    final boolean isAccountExists = accountRepository.existsByEmail(email);

    if (isAccountExists) {
      throw new DataIntegrityViolationException(accountServiceConstants.EMAIL_ALREADY_EXISTS);
    }
  }
}
