package net.tamasnovak.services.account.baseAccount;

public interface AccountVerificationService {
  void verifyAccountNotExistsByEmail(String email);
}
