/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.service;

import net.tamasnovak.artifact.account.account.service.AccountService;
import net.tamasnovak.artifact.account.pendingaccount.dto.PendingAccountRegistrationPayload;
import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import net.tamasnovak.artifact.account.pendingaccount.persistence.PendingAccountRepository;
import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.role.service.RoleService;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.artifact.support.institution.service.InstitutionService;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.EmailSenderRabbitConfig;
import net.tamasnovak.rabbitmq.models.emailQueue.PendingAccountConfirmationQueue;
import net.tamasnovak.rabbitmq.service.QueueSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link PendingAccount} entity-related operations, implementing {@link PendingAccountService}.
 */
@Service
@Qualifier(value = "PendingAccountService")
public class PendingAccountServiceImpl implements PendingAccountService {
  private final AccountService accountService;
  private final InstitutionService institutionService;
  private final RoleService roleService;
  private final PendingAccountRepository pendingAccountRepository;
  private final QueueSender queueSender;

  @Autowired
  public PendingAccountServiceImpl(
    AccountService accountService, InstitutionService institutionService, RoleService roleService, QueueSender queueSender,
    PendingAccountRepository pendingAccountRepository) {
    this.accountService = accountService;
    this.institutionService = institutionService;
    this.roleService = roleService;
    this.queueSender = queueSender;
    this.pendingAccountRepository = pendingAccountRepository;
  }

  @Override
  @Transactional(readOnly = true)
  public void validateAccountDoesNotExist(final String email) {
    final boolean isPendingAccountExists = pendingAccountRepository.existsPendingAccountByEmail(email);

    if (isPendingAccountExists) {
      throw new DataIntegrityViolationException(PendingAccountServiceMessages.EMAIL_ALREADY_EXISTS);
    }
  }

  @Override
  @Transactional
  public void createPendingAccount(final PendingAccountRegistrationPayload requestBody) {
    // Check if an account or pending account with the provided email already exists.
    accountService.validateAccountDoesNotExist(requestBody.email());
    this.validateAccountDoesNotExist(requestBody.email());

    // Find the selected institution and role objects.
    final Institution selectedInstitution = institutionService.findInstitutionByUuid(requestBody.getInstituionUuid());
    final Role selectedRole = roleService.findRoleByUuid(requestBody.getAccountRoleUuid());

    // Create the new pending account object, then save it in the database.
    final PendingAccount pendingAccount = PendingAccount.createPendingAccount(requestBody.firstName(), requestBody.lastName(),
      requestBody.email(), selectedInstitution, selectedRole);
    final PendingAccount savedEntity = pendingAccountRepository.save(pendingAccount);

    // Initiate a pending-registration-welcome-email queue via RabbitMQ.
    final PendingAccountConfirmationQueue queueDto = new PendingAccountConfirmationQueue(savedEntity.getEmail(),
      savedEntity.getFirstName(), savedEntity.getLastName(), savedEntity.fetchInstitutionName(), savedEntity.fetchNoPrefixRoleName());
    queueSender.send(EmailSenderRabbitConfig.EMAIL_SENDING_EXCHANGE_KEY, EmailSenderRabbitConfig.PENDING_ACCOUNT_CONFIRMATION_ROUTING_KEY,
      queueDto);
  }
}
