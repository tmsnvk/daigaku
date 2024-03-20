package net.tamasnovak.services.account;

public interface AccountConstraintValidator {
  void checkIfExistsByEmail(String email);
}
