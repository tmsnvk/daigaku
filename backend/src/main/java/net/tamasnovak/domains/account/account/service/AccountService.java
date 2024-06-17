package net.tamasnovak.domains.account.account.service;

import net.tamasnovak.domains.account.account.models.dtoRequests.LoginRequestDto;
import net.tamasnovak.domains.account.account.models.dtoResponses.ClientAuthContextDto;
import net.tamasnovak.domains.account.account.models.dtoResponses.LoginReturnDto;
import net.tamasnovak.domains.account.account.models.entity.Account;
import org.springframework.security.core.Authentication;

import java.util.UUID;

public interface AccountService {
  Account getByEmail(String email);

  Account getByUuid(UUID accountUuid);

  ClientAuthContextDto getClientAuthContextDto(String email);

  LoginReturnDto getLoginReturnDto(LoginRequestDto requestBody, Authentication authentication);

  void verifyAccountNotExistsByEmail(String email);
}
