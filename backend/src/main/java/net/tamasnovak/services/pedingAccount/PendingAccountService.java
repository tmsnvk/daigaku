package net.tamasnovak.services.pedingAccount;

import net.tamasnovak.dtos.account.access.AccountRegistrationDto;
import net.tamasnovak.entities.PendingAccount;
import net.tamasnovak.exception.FormErrorException;
import net.tamasnovak.repositories.PendingAccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PendingAccountService {
  private final PendingAccountRepository pendingAccountRepository;
  private final PendingAccountServiceMessages pendingAccountServiceMessages;

  public PendingAccountService(PendingAccountRepository pendingAccountRepository, PendingAccountServiceMessages pendingAccountServiceMessages) {
    this.pendingAccountRepository = pendingAccountRepository;
    this.pendingAccountServiceMessages = pendingAccountServiceMessages;
  }

  @Transactional
  public void addAccount(AccountRegistrationDto registrationData) {
    PendingAccount pendingAccount = new PendingAccount(
      registrationData.firstName(),
      registrationData.lastName(),
      registrationData.email()
    );

    pendingAccountRepository.save(pendingAccount);
  }

  public void checkEmailInDatabase(String email) {
    Optional<PendingAccount> pendingAccount = pendingAccountRepository.findByEmail(email);

    if (pendingAccount.isPresent()) {
      throw new FormErrorException(pendingAccountServiceMessages.EMAIL_ALREADY_EXISTS);
    }
  }
}
