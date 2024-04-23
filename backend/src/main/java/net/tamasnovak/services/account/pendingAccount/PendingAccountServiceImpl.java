package net.tamasnovak.services.account.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.dtos.email.NewEmailDto;
import net.tamasnovak.entities.account.baseAccount.PendingAccount;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.repositories.account.PendingAccountRepository;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.institution.InstitutionService;
import net.tamasnovak.utilities.StringFormatterUtilities;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class PendingAccountServiceImpl implements PendingAccountService {
  private final AccountService accountService;
  private final InstitutionService institutionService;
  private final EmailService emailService;
  private final PendingAccountRepository pendingAccountRepository;
  private final PendingAccountConstants pendingAccountConstants;
  private final StringFormatterUtilities stringFormatterUtilities;
  private final ValidatorUtilities validatorUtilities;

  @Autowired
  public PendingAccountServiceImpl(AccountService accountService, InstitutionService institutionService, EmailService emailService, PendingAccountRepository pendingAccountRepository, PendingAccountConstants pendingAccountConstants, StringFormatterUtilities stringFormatterUtilities, ValidatorUtilities validatorUtilities) {
    this.accountService = accountService;
    this.institutionService = institutionService;
    this.emailService = emailService;
    this.pendingAccountRepository = pendingAccountRepository;
    this.pendingAccountConstants = pendingAccountConstants;
    this.stringFormatterUtilities = stringFormatterUtilities;
    this.validatorUtilities = validatorUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public void checkIfExistsByEmail(String email) {
    boolean isPendingAccountExists = pendingAccountRepository.existsByEmail(email);

    if (isPendingAccountExists) {
      throw new DataIntegrityViolationException(pendingAccountConstants.EMAIL_ALREADY_EXISTS);
    }
  }

  @Override
  @Transactional
  public void addAccount(PendingAccountRegistrationDto registrationData) {
    checkIfExistsByEmail(registrationData.email());
    accountService.checkIfExistsByEmail(registrationData.email());

    UUID validInstitutionUuid = validatorUtilities.validateIfStringIsUuid(registrationData.institutionUuid());
    Institution institution = institutionService.findByUuid(validInstitutionUuid);

    PendingAccount pendingAccount = PendingAccount.createPendingAccount(
      stringFormatterUtilities.capitaliseWord(registrationData.firstName()),
      stringFormatterUtilities.capitaliseWord(registrationData.lastName()),
      registrationData.email().toLowerCase(),
      institution
    );

    pendingAccountRepository.save(pendingAccount);

    sendEmail(registrationData, institution);
  }

  private void sendEmail(PendingAccountRegistrationDto registrationData, Institution institution) {
    NewEmailDto newEmail = new NewEmailDto(
      registrationData.email(),
      pendingAccountConstants.PENDING_ACCOUNT_EMAIL_SUBJECT,
      String.format(pendingAccountConstants.PENDING_ACCOUNT_EMAIL_BODY, registrationData.firstName(), registrationData.lastName(), institution.getName())
    );

    emailService.sendEmail(newEmail);
  }
}
