package net.tamasnovak.services.pedingAccount;

import net.tamasnovak.dtos.account.access.AccountRegistrationDto;
import net.tamasnovak.entities.account.PendingAccount;
import net.tamasnovak.exceptions.FormErrorException;
import net.tamasnovak.repositories.PendingAccountRepository;
import net.tamasnovak.utilities.StringFormatterUtilities;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PendingAccountService {
  private final PendingAccountRepository pendingAccountRepository;
  private final PendingAccountServiceMessages pendingAccountServiceMessages;
  private final StringFormatterUtilities stringFormatterUtilities;

  public PendingAccountService(PendingAccountRepository pendingAccountRepository, PendingAccountServiceMessages pendingAccountServiceMessages, StringFormatterUtilities stringFormatterUtilities) {
    this.pendingAccountRepository = pendingAccountRepository;
    this.pendingAccountServiceMessages = pendingAccountServiceMessages;
    this.stringFormatterUtilities = stringFormatterUtilities;
  }

  @Transactional
  public void addAccount(AccountRegistrationDto registrationData) {
    PendingAccount pendingAccount = new PendingAccount(
      stringFormatterUtilities.capitaliseWord(registrationData.firstName()),
      stringFormatterUtilities.capitaliseWord(registrationData.lastName()),
      registrationData.email().toLowerCase()
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
