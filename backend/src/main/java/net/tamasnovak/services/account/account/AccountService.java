package net.tamasnovak.services.account.account;

import net.tamasnovak.dtos.account.request.LoginRequestDto;
import net.tamasnovak.dtos.account.response.ClientAuthContextDto;
import net.tamasnovak.dtos.account.response.LoginReturnDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import org.springframework.security.core.Authentication;

public interface AccountService {
  void checkIfExistsByEmail(String email);
  Account findByEmail(String email);
  ClientAuthContextDto getClientAuthContextData(String email);
  LoginReturnDto getLoginData(LoginRequestDto loginRequestDto, Authentication authentication);
}
