package net.tamasnovak.artifact.account.account.service;

import net.tamasnovak.artifact.account.account.dto.LoginRequest;
import net.tamasnovak.artifact.account.account.dto.ClientAuthContext;
import net.tamasnovak.artifact.account.account.dto.LoginResponse;
import net.tamasnovak.artifact.account.account.entity.Account;
import org.springframework.security.core.Authentication;

import java.util.UUID;

public interface AccountService {
  Account findByEmail(String email);

  Account findByUuid(UUID uuid);

  ClientAuthContext fetchClientAuthContextDto(String email);

  LoginResponse fetchLoginReturnDto(LoginRequest requestBody, Authentication authentication);

  void verifyAccountNotExistsByEmail(String email);
}
