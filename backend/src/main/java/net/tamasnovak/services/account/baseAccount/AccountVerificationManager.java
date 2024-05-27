package net.tamasnovak.services.account.baseAccount;

public interface AccountVerificationManager {
  void verifyAccountNotExistsByEmail(String email);
}
