package net.tamasnovak.services.account.baseAccount.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.dtos.email.NewEmailDto;
import net.tamasnovak.entities.account.PendingAccount;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.entities.support.institution.Institution;
import net.tamasnovak.repositories.account.baseAccount.PendingAccountRepository;
import net.tamasnovak.services.account.baseAccount.AccountLifeCycleService;
import net.tamasnovak.services.account.baseAccount.AccountVerificationService;
import net.tamasnovak.services.email.EmailCoreService;
import net.tamasnovak.services.role.RoleCoreService;
import net.tamasnovak.services.support.SupportCoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "PendingAccountService")
public class PendingAccountService implements PendingAccountCoreService, AccountVerificationService, AccountLifeCycleService<PendingAccountRegistrationDto> {
  private final AccountVerificationService accountVerificationService;
  private final SupportCoreService<Institution> institutionSupportCoreService;
  private final RoleCoreService roleCoreService;
  private final EmailCoreService emailService;
  private final PendingAccountRepository pendingAccountRepository;
  private final PendingAccountServiceConstants pendingAccountConstants;

  @Autowired
  public PendingAccountService(@Qualifier("AccountService") AccountVerificationService accountVerificationService, @Qualifier("InstitutionService") SupportCoreService<Institution> institutionSupportCoreService, RoleCoreService roleCoreService, EmailCoreService emailService, PendingAccountRepository pendingAccountRepository, PendingAccountServiceConstants pendingAccountConstants) {
    this.accountVerificationService = accountVerificationService;
    this.institutionSupportCoreService = institutionSupportCoreService;
    this.roleCoreService = roleCoreService;
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
    accountVerificationService.verifyAccountNotExistsByEmail(requestBody.email());
    verifyAccountNotExistsByEmail(requestBody.email());

    Institution institution = institutionSupportCoreService.getByUuid(requestBody.institutionUuid());
    Role role = roleCoreService.getRoleByName(requestBody.accountType());

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
