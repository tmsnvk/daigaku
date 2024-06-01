package net.tamasnovak.domains.account.account.service;

import net.tamasnovak.domains.account.account.models.dtoRequests.LoginRequestDto;
import net.tamasnovak.domains.account.account.models.dtoResponses.ClientAuthContextDto;
import net.tamasnovak.domains.account.account.models.dtoResponses.LoginReturnDto;
import net.tamasnovak.domains.account.account.models.entity.Account;
import org.springframework.security.core.Authentication;

public interface AccountService {
  Account getByEmail(String email);

  ClientAuthContextDto getClientAuthContextDto(String email);

  LoginReturnDto getLoginReturnDto(LoginRequestDto requestBody, Authentication authentication);

  void verifyAccountNotExistsByEmail(String email);
}
