package net.tamasnovak.services.account.baseAccount.account;

import net.tamasnovak.dtos.account.request.AccountRegistrationDto;
import net.tamasnovak.dtos.account.request.LoginRequestDto;
import net.tamasnovak.dtos.account.response.ClientAuthContextDto;
import net.tamasnovak.dtos.account.response.LoginReturnDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.services.account.baseAccount.AccountLifeCycle;
import net.tamasnovak.services.account.baseAccount.AccountVerification;
import org.springframework.security.core.Authentication;

public interface AccountService extends AccountVerification, AccountLifeCycle<AccountRegistrationDto> {
  Account getAccountByEmail(String email);
  ClientAuthContextDto getClientAuthContextDto(String email);
  LoginReturnDto getLoginReturnDto(LoginRequestDto requestBody, Authentication authentication);
}
