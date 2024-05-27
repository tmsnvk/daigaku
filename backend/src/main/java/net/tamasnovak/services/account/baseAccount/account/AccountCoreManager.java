package net.tamasnovak.services.account.baseAccount.account;

import net.tamasnovak.dtos.account.request.LoginRequestDto;
import net.tamasnovak.dtos.account.response.ClientAuthContextDto;
import net.tamasnovak.dtos.account.response.LoginReturnDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import org.springframework.security.core.Authentication;

public interface AccountCoreManager {
  Account getAccountByEmail(String email);
  ClientAuthContextDto getClientAuthContextDto(String email);
  LoginReturnDto getLoginReturnDto(LoginRequestDto requestBody, Authentication authentication);
}
