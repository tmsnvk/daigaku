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
  public Account findByEmail(final String email) {
    return accountRepository.findByEmail(email)
      .orElseThrow(() -> new EntityNotFoundException(serviceConstants.ACCOUNT_NOT_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public Account findByUuid(final UUID uuid) {
    return accountRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(serviceConstants.ACCOUNT_NOT_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public ClientAuthContext fetchClientAuthContextDto(final String email) {
    final Account account = findByEmail(email);

    return account.getAuthContext();
  }

  @Override
  @Transactional(readOnly = true)
  public LoginResponse fetchLoginReturnDto(final LoginRequest requestBody, final Authentication authentication) {
    final Account account = findByEmail(requestBody.email());
    final String jwtToken = jwtUtilities.generateJwtToken(authentication);

    return account.getLoginData(jwtToken);
  }

  @Override
  @Transactional(readOnly = true)
  public void verifyAccountNotExistsByEmail(final String email) {
    final boolean isAccountExists = accountRepository.existsByEmail(email);

    if (isAccountExists) {
      throw new DataIntegrityViolationException(serviceConstants.EMAIL_ALREADY_EXISTS);
    }
  }
}
