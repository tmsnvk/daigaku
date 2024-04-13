package net.tamasnovak.services.account.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.entities.account.PendingAccount;
import net.tamasnovak.repositories.account.PendingAccountRepository;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.utilities.StringFormatterUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PendingAccountServiceImpl implements PendingAccountService {
  private final AccountService accountService;
  private final PendingAccountRepository pendingAccountRepository;
  private final PendingAccountServiceConstants pendingAccountServiceConstants;
  private final StringFormatterUtilities stringFormatterUtilities;

  @Autowired
  public PendingAccountServiceImpl(AccountService accountService, PendingAccountRepository pendingAccountRepository, PendingAccountServiceConstants pendingAccountServiceConstants, StringFormatterUtilities stringFormatterUtilities) {
    this.accountService = accountService;
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
    checkIfExistsByEmail(registrationData.email());
    accountService.checkIfExistsByEmail(registrationData.email());

    PendingAccount pendingAccount = new PendingAccount(
      stringFormatterUtilities.capitaliseWord(registrationData.firstName()),
      stringFormatterUtilities.capitaliseWord(registrationData.lastName()),
      registrationData.email().toLowerCase()
    );

    pendingAccountRepository.save(pendingAccount);
  }
}
