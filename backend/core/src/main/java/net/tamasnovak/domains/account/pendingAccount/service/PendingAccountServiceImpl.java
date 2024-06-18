package net.tamasnovak.domains.account.pendingAccount.service;

import net.tamasnovak.domains.account.account.service.AccountService;
import net.tamasnovak.domains.account.pendingAccount.models.dtoRequests.PendingAccountRegistrationDto;
import net.tamasnovak.domains.account.pendingAccount.models.entity.PendingAccount;
import net.tamasnovak.domains.account.pendingAccount.persistence.PendingAccountRepository;
import net.tamasnovak.domains.role.models.entity.Role;
import net.tamasnovak.domains.role.service.RoleService;
import net.tamasnovak.domains.support.institution.models.entity.Institution;
import net.tamasnovak.domains.support.institution.service.InstitutionService;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.email.dtos.NewEmailDto;
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
  private final PendingAccountConstants pendingAccountConstants;

  @Autowired
  public PendingAccountServiceImpl(AccountService accountService, InstitutionService institutionService, RoleService roleService, EmailService emailService, PendingAccountRepository pendingAccountRepository, PendingAccountConstants pendingAccountConstants) {
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
    Role role = roleService.getByUuid(requestBody.accountRoleUuid());

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
      role.getNameWithoutPrefix()
    );

    NewEmailDto newEmail = new NewEmailDto(requestBody.email(), pendingAccountConstants.PENDING_ACCOUNT_EMAIL_SUBJECT, content);

    emailService.sendSimpleEmail(newEmail);
  }
}
