package net.tamasnovak.artifact.account.account.service;

import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.dto.AuthContext;
import net.tamasnovak.artifact.account.account.dto.AuthResponse;
import net.tamasnovak.artifact.account.account.dto.LoginRequest;
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
 * Service class that manages "/api/v1/accounts" endpoint root REST API operations, implementing {@link AccountService}.
 *
 * @since 0.0.1
 */
@Service
@Qualifier(value = "AccountService")
public class AccountServiceImpl implements AccountService {
  private final AccountRepository accountRepository;
  private final AccountServiceConstants serviceConstants;
  private final JwtUtilities jwtUtilities;

  @Autowired
  public AccountServiceImpl(AccountRepository accountRepository, AccountServiceConstants serviceConstants, JwtUtilities jwtUtilities) {
    this.accountRepository = accountRepository;
    this.serviceConstants = serviceConstants;
    this.jwtUtilities = jwtUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public Account findAccountByEmail(final String email) {
    return accountRepository.findByEmail(email)
                            .orElseThrow(() -> new EntityNotFoundException(serviceConstants.ACCOUNT_NOT_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public Account findAccountByUuid(final UUID uuid) {
    return accountRepository.findByUuid(uuid)
                            .orElseThrow(() -> new EntityNotFoundException(serviceConstants.ACCOUNT_NOT_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public AuthContext retrieveAuthContextByAccountEmail(final String email) {
    final Account account = this.findAccountByEmail(email);

    return account.createAuthContext();
  }

  @Override
  @Transactional(readOnly = true)
  public AuthResponse createAuthResponse(final LoginRequest requestBody, final Authentication authentication) {
    final Account account = this.findAccountByEmail(requestBody.email());
    final String jwtToken = jwtUtilities.generateJwtToken(authentication);

    return account.createAuthResponse(jwtToken);
  }

  @Override
  @Transactional(readOnly = true)
  public void checkAccountDoesNotExistByEmail(final String email) {
    final boolean isAccountExists = accountRepository.existsByEmail(email);

    if (isAccountExists) {
      throw new DataIntegrityViolationException(serviceConstants.EMAIL_ALREADY_EXISTS);
    }
  }
}
