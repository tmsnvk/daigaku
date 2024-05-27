package net.tamasnovak.services.account.baseAccount.account;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.account.request.AccountRegistrationDto;
import net.tamasnovak.dtos.account.request.LoginRequestDto;
import net.tamasnovak.dtos.account.response.ClientAuthContextDto;
import net.tamasnovak.dtos.account.response.LoginReturnDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.repositories.account.baseAccount.AccountRepository;
import net.tamasnovak.security.utilities.JwtUtilities;
import net.tamasnovak.services.account.baseAccount.AccountLifeCycleService;
import net.tamasnovak.services.account.baseAccount.AccountVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "AccountService")
public class AccountService implements AccountCoreService, AccountVerificationService, AccountLifeCycleService<AccountRegistrationDto> {
  private final AccountRepository accountRepository;
  private final AccountServiceConstants accountConstants;
  private final JwtUtilities jwtUtilities;

  @Autowired
  public AccountService(AccountRepository accountRepository, AccountServiceConstants accountConstants, JwtUtilities jwtUtilities) {
    this.accountRepository = accountRepository;
    this.accountConstants = accountConstants;
    this.jwtUtilities = jwtUtilities;
  }

  /*
   * AccountCoreService interface implementations
   */
  @Override
  @Transactional(readOnly = true)
  public Account getAccountByEmail(String email) {
    return accountRepository.findByEmail(email)
      .orElseThrow(() -> new EntityNotFoundException(accountConstants.ACCOUNT_NOT_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public ClientAuthContextDto getClientAuthContextDto(String email) {
    Account account = getAccountByEmail(email);

    return new ClientAuthContextDto(
      account.getEmail(),
      account.getFirstName(),
      account.getRole().getName()
    );
  }

  @Override
  @Transactional(readOnly = true)
  public LoginReturnDto getLoginReturnDto(LoginRequestDto requestBody, Authentication authentication) {
    Account account = getAccountByEmail(requestBody.email().toLowerCase());
    String jwtToken = jwtUtilities.generateJwtToken(authentication);

    return new LoginReturnDto(
      account.getEmail(),
      account.getFirstName(),
      account.getRole().getName(),
      jwtToken
    );
  }

  /*
   * AccountVerificationService interface implementations
   */
  @Override
  @Transactional(readOnly = true)
  public void verifyAccountNotExistsByEmail(String email) {
    boolean isAccountExists = accountRepository.existsByEmail(email);

    if (isAccountExists) {
      throw new DataIntegrityViolationException(accountConstants.EMAIL_ALREADY_EXISTS);
    }
  }

  /*
   * AccountLifeCycleService interface implementations
   */
  @Override
  @Transactional
  public void create(AccountRegistrationDto requestBody) {

  }
}
