package net.tamasnovak.services.account.pendingAccount;

import net.tamasnovak.dtos.account.access.PendingAccountRegistrationDto;
import net.tamasnovak.entities.account.PendingAccount;
import net.tamasnovak.repositories.PendingAccountRepository;
import net.tamasnovak.services.account.AccountConstraintValidator;
import net.tamasnovak.services.account.AccountCrudOperator;
import net.tamasnovak.utilities.StringFormatterUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PendingAccountService implements AccountConstraintValidator, AccountCrudOperator {
  private final PendingAccountRepository pendingAccountRepository;
  private final PendingAccountServiceConstants pendingAccountServiceConstants;
  private final StringFormatterUtilities stringFormatterUtilities;

  @Autowired
  public PendingAccountService(PendingAccountRepository pendingAccountRepository, PendingAccountServiceConstants pendingAccountServiceConstants, StringFormatterUtilities stringFormatterUtilities) {
    this.pendingAccountRepository = pendingAccountRepository;
    this.pendingAccountServiceConstants = pendingAccountServiceConstants;
    this.stringFormatterUtilities = stringFormatterUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public void checkIfExistsByEmail(String email) {
    boolean isPendingAccountExists = pendingAccountRepository.existsByEmail(email);

    if (isPendingAccountExists) {
      throw new DataIntegrityViolationException(pendingAccountServiceConstants.EMAIL_ALREADY_EXISTS);
    }
  }

  @Override
  @Transactional
  public void addAccount(PendingAccountRegistrationDto registrationData) {
    PendingAccount pendingAccount = new PendingAccount(
      stringFormatterUtilities.capitaliseWord(registrationData.firstName()),
      stringFormatterUtilities.capitaliseWord(registrationData.lastName()),
      registrationData.email().toLowerCase()
    );

    pendingAccountRepository.save(pendingAccount);
  }
}
