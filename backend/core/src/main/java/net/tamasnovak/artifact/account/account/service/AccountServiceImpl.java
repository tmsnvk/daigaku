/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.service;

import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.dto.AuthContextResponse;
import net.tamasnovak.artifact.account.account.dto.LoginRequest;
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

/**
 * Service class managing {@link Account} entity-related API operations, implementing {@link AccountService}.
 *
 * @since 0.0.1
 */
@Service
@Qualifier(value = "AccountService")
public class AccountServiceImpl implements AccountService {
  private final AccountRepository accountRepository;
  private final JwtUtilities jwtUtilities;

  @Autowired
  public AccountServiceImpl(AccountRepository accountRepository, JwtUtilities jwtUtilities) {
    this.accountRepository = accountRepository;
    this.jwtUtilities = jwtUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public Account findAccountByEmail(final String email) {
    return accountRepository.findByEmail(email)
                            .orElseThrow(() -> new EntityNotFoundException(AccountServiceConstants.ACCOUNT_NOT_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public Account findAccountByUuid(final UUID uuid) {
    return accountRepository.findByUuid(uuid)
                            .orElseThrow(() -> new EntityNotFoundException(AccountServiceConstants.ACCOUNT_NOT_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public AuthContextResponse retrieveAuthContextResponseByAccountEmail(final String email) {
    final Account account = this.findAccountByEmail(email);

    return account.createAuthContextResponse();
  }

  @Override
  @Transactional(readOnly = true)
  public LoginResponse retrieveLoginResponse(final LoginRequest requestBody, final Authentication authentication) {
    final Account account = this.findAccountByEmail(requestBody.email());
    final String jwtToken = jwtUtilities.generateJwtToken(authentication);

    return account.createLoginResponse(jwtToken);
  }

  @Override
  @Transactional(readOnly = true)
  public void checkAccountDoesNotExistByEmail(final String email) {
    final boolean isAccountExists = accountRepository.existsByEmail(email);

    if (isAccountExists) {
      throw new DataIntegrityViolationException(AccountServiceConstants.EMAIL_ALREADY_EXISTS);
    }
  }
}
