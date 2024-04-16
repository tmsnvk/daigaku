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
  private final PendingAccountRepository pendingAccountRepository;
  private final PendingAccountServiceConstants pendingAccountServiceConstants;
  private final StringFormatterUtilities stringFormatterUtilities;
  private final ValidatorUtilities validatorUtilities;
  private final InstitutionService institutionService;
  private final EmailService emailService;

  @Autowired
  public PendingAccountServiceImpl(AccountService accountService, PendingAccountRepository pendingAccountRepository, PendingAccountServiceConstants pendingAccountServiceConstants, StringFormatterUtilities stringFormatterUtilities, ValidatorUtilities validatorUtilities, InstitutionService institutionService, EmailService emailService) {
    this.accountService = accountService;
    this.pendingAccountRepository = pendingAccountRepository;
    this.pendingAccountServiceConstants = pendingAccountServiceConstants;
    this.stringFormatterUtilities = stringFormatterUtilities;
    this.validatorUtilities = validatorUtilities;
    this.institutionService = institutionService;
    this.emailService = emailService;
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

    UUID validInstitutionUuid = validatorUtilities.validateIfStringIsUuid(registrationData.institutionUuid(), pendingAccountServiceConstants.NOT_VALID_INSTITUTION);
    Institution institution = institutionService.findByUuid(validInstitutionUuid);

    PendingAccount pendingAccount = new PendingAccount(
      stringFormatterUtilities.capitaliseWord(registrationData.firstName()),
      stringFormatterUtilities.capitaliseWord(registrationData.lastName()),
      registrationData.email().toLowerCase(),
      institution
      );

    pendingAccountRepository.save(pendingAccount);

    NewEmailDto newEmail = new NewEmailDto(
      registrationData.email(),
      pendingAccountServiceConstants.PENDING_ACCOUNT_EMAIL_SUBJECT,
      String.format(pendingAccountServiceConstants.PENDING_ACCOUNT_EMAIL_BODY, registrationData.firstName(), registrationData.lastName(), institution.getName())
    );

    emailService.sendEmail(newEmail);
  }
}
