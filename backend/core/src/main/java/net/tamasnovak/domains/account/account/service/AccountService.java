package net.tamasnovak.domains.account.account.service;

import net.tamasnovak.domains.account.account.dto.LoginRequest;
import net.tamasnovak.domains.account.account.dto.ClientAuthContext;
import net.tamasnovak.domains.account.account.dto.LoginResponse;
import net.tamasnovak.domains.account.account.entity.Account;
import org.springframework.security.core.Authentication;

import java.util.UUID;

public interface AccountService {
  Account getByEmail(String email);

  Account getByUuid(UUID accountUuid);

  ClientAuthContext getClientAuthContextDto(String email);

  LoginResponse getLoginReturnDto(LoginRequest requestBody, Authentication authentication);

  void verifyAccountNotExistsByEmail(String email);
}
