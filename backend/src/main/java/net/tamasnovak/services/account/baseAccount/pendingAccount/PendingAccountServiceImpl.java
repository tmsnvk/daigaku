package net.tamasnovak.services.account.baseAccount.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.dtos.email.NewEmailDto;
import net.tamasnovak.entities.account.PendingAccount;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.entities.support.institution.Institution;
import net.tamasnovak.repositories.account.baseAccount.PendingAccountRepository;
import net.tamasnovak.services.account.baseAccount.account.AccountService;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.role.RoleService;
import net.tamasnovak.services.support.institution.InstitutionService;
import net.tamasnovak.utilities.formatter.StringFormatterUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PendingAccountServiceImpl implements PendingAccountService {
  private final AccountService accountService;
  private final InstitutionService institutionService;
  private final RoleService roleService;
  private final EmailService emailService;
  private final PendingAccountRepository pendingAccountRepository;
  private final PendingAccountServiceConstants pendingAccountConstants;

  @Autowired
  public PendingAccountServiceImpl(AccountService accountService, InstitutionService institutionService, RoleService roleService, EmailService emailService, PendingAccountRepository pendingAccountRepository, PendingAccountServiceConstants pendingAccountConstants) {
    this.accountService = accountService;
    this.institutionService = institutionService;
    this.roleService = roleService;
    this.emailService = emailService;
    this.pendingAccountRepository = pendingAccountRepository;
    this.pendingAccountConstants = pendingAccountConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public void verifyAccountNotExistsByEmail(String email) {
    boolean isPendingAccountExists = pendingAccountRepository.existsByEmail(email);

    if (isPendingAccountExists) {
      throw new DataIntegrityViolationException(pendingAccountConstants.EMAIL_ALREADY_EXISTS);
    }
  }

  @Override
  @Transactional
  public void create(PendingAccountRegistrationDto requestBody) {
    accountService.verifyAccountNotExistsByEmail(requestBody.email());
    verifyAccountNotExistsByEmail(requestBody.email());

    Institution institution = institutionService.getByUuid(requestBody.institutionUuid());
    Role role = roleService.getRoleByUuid(requestBody.accountRoleUuid());

    PendingAccount pendingAccount = PendingAccount.createPendingAccount(
      requestBody.firstName(),
      requestBody.lastName(),
      requestBody.email(),
      institution,
      role
    );

    pendingAccountRepository.save(pendingAccount);

    sendWelcomeEmail(requestBody, institution, role);
  }

  private void sendWelcomeEmail(PendingAccountRegistrationDto requestBody, Institution institution, Role role) {
    String content = String.format(
      pendingAccountConstants.PENDING_ACCOUNT_EMAIL_BODY,
      requestBody.firstName(),
      requestBody.lastName(),
      institution.getName(),
      StringFormatterUtilities.removeRolePrefix(role.getName())
    );

    NewEmailDto newEmail = new NewEmailDto(requestBody.email(), pendingAccountConstants.PENDING_ACCOUNT_EMAIL_SUBJECT, content);

    emailService.sendSimpleEmail(newEmail);
  }
}
