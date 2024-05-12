package net.tamasnovak.services.account.account;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.account.request.LoginRequestDto;
import net.tamasnovak.dtos.account.response.ClientAuthContextDto;
import net.tamasnovak.dtos.account.response.LoginReturnDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.repositories.account.AccountRepository;
import net.tamasnovak.security.utilities.JwtUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
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

  @Override
  @Transactional(readOnly = true)
  public ClientAuthContextDto getClientAuthContextDto(String email) {
    Account account = findByEmail(email);

    return new ClientAuthContextDto(
      account.getEmail(),
      account.getFirstName(),
      account.getRole().getName()
    );
  }

  @Override
  @Transactional(readOnly = true)
  public LoginReturnDto getLoginReturnDto(LoginRequestDto requestBody, Authentication authentication) {
    Account account = findByEmail(requestBody.email().toLowerCase());
    String jwtToken = jwtUtilities.generateJwtToken(authentication);

    return new LoginReturnDto(
      account.getEmail(),
      account.getFirstName(),
      account.getRole().getName(),
      jwtToken
    );
  }
}
