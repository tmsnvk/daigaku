package net.tamasnovak.services.account.account;

import net.tamasnovak.entities.account.Account;

public interface AccountService {
  void checkIfExistsByEmail(String email);
  Account findUserByEmail(String email);
}
