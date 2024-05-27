package net.tamasnovak.services.account.baseAccount.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.dtos.email.NewEmailDto;
import net.tamasnovak.entities.account.baseAccount.PendingAccount;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.repositories.account.baseAccount.PendingAccountRepository;
import net.tamasnovak.services.account.baseAccount.AccountLifeCycleService;
import net.tamasnovak.services.account.baseAccount.AccountVerificationService;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.institution.InstitutionService;
import net.tamasnovak.services.role.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "PendingAccountService")
public class PendingAccountService implements PendingAccountCoreService, AccountVerificationService, AccountLifeCycleService<PendingAccountRegistrationDto> {
  private final AccountVerificationService accountServiceVerificationManager;
  private final InstitutionService institutionService;
  private final RoleService roleService;
  private final EmailService emailService;
  private final PendingAccountRepository pendingAccountRepository;
  private final PendingAccountServiceConstants pendingAccountConstants;

  @Autowired
  public PendingAccountService(@Qualifier("AccountService") AccountVerificationService accountServiceVerificationManager, InstitutionService institutionService, RoleService roleService, EmailService emailService, PendingAccountRepository pendingAccountRepository, PendingAccountServiceConstants pendingAccountConstants) {
    this.accountServiceVerificationManager = accountServiceVerificationManager;
    this.institutionService = institutionService;
    this.roleService = roleService;
    this.emailService = emailService;
    this.pendingAccountRepository = pendingAccountRepository;
    this.pendingAccountConstants = pendingAccountConstants;
  }

  /*
   * PendingAccountCoreService interface implementations
   */

  /*
   * AccountVerificationService interface implementations
   */
  @Override
  @Transactional(readOnly = true)
  public void verifyAccountNotExistsByEmail(String email) {
    boolean isPendingAccountExists = pendingAccountRepository.existsByEmail(email);

    if (isPendingAccountExists) {
      throw new DataIntegrityViolationException(pendingAccountConstants.EMAIL_ALREADY_EXISTS);
    }
  }

  /*
   * AccountLifeCycleService interface implementations
   */
  @Override
  @Transactional
  public void create(PendingAccountRegistrationDto requestBody) {
    accountServiceVerificationManager.verifyAccountNotExistsByEmail(requestBody.email());
    verifyAccountNotExistsByEmail(requestBody.email());

    Institution institution = institutionService.getInstitutionByUuid(requestBody.institutionUuid());
    Role role = roleService.getRoleByName(requestBody.accountType());

    PendingAccount pendingAccount = PendingAccount.createPendingAccount(
      requestBody.firstName(),
      requestBody.lastName(),
      requestBody.email(),
      institution,
      role
    );

    pendingAccountRepository.save(pendingAccount);

    sendWelcomeEmail(requestBody, institution);
  }

  private void sendWelcomeEmail(PendingAccountRegistrationDto requestBody, Institution institution) {
    String content = String.format(
      pendingAccountConstants.PENDING_ACCOUNT_EMAIL_BODY,
      requestBody.firstName(),
      requestBody.lastName(),
      institution.getName(),
      requestBody.accountType()
    );

    NewEmailDto newEmail = new NewEmailDto(requestBody.email(), pendingAccountConstants.PENDING_ACCOUNT_EMAIL_SUBJECT, content);

    emailService.sendSimpleEmail(newEmail);
  }
}
