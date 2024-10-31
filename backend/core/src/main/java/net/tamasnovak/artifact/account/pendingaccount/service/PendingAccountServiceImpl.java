/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.service;

import net.tamasnovak.artifact.account.account.service.AccountService;
import net.tamasnovak.artifact.account.pendingaccount.dto.PendingAccountRegistration;
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
 * Service class that manages "/api/v1/pending-accounts" endpoint root REST API operations, implementing {@link PendingAccountService}.
 *
 * @since 0.0.1
 */
@Service
@Qualifier(value = "PendingAccountService")
public class PendingAccountServiceImpl implements PendingAccountService {
  private final AccountService accountService;
  private final InstitutionService institutionService;
  private final RoleService roleService;
  private final QueueSender queueSender;
  private final PendingAccountRepository pendingAccountRepository;

  @Autowired
  public PendingAccountServiceImpl(
    AccountService accountService, InstitutionService institutionService, RoleService roleService,
    QueueSender queueSender, PendingAccountRepository pendingAccountRepository) {
    this.accountService = accountService;
    this.institutionService = institutionService;
    this.roleService = roleService;
    this.queueSender = queueSender;
    this.pendingAccountRepository = pendingAccountRepository;
  }

  @Override
  @Transactional(readOnly = true)
  public void checkAccountDoesNotExistByEmail(final String email) {
    final boolean isPendingAccountExists = pendingAccountRepository.existsByEmail(email);

    if (isPendingAccountExists) {
      throw new DataIntegrityViolationException(PendingAccountServiceConstants.EMAIL_ALREADY_EXISTS);
    }
  }

  @Override
  @Transactional
  public void createPendingAccount(final PendingAccountRegistration requestBody) {
    // Check if account with provided email already exists.
    accountService.checkAccountDoesNotExistByEmail(requestBody.email());
    this.checkAccountDoesNotExistByEmail(requestBody.email());

    // Find the selected institution and role objects.
    final Institution institution = institutionService.findByUuid(requestBody.getInstituionUuid());
    final Role role = roleService.findByUuid(requestBody.getAccountRoleUuid());

    // Create the new pending account object, then save it in the database.
    final PendingAccount pendingAccount = PendingAccount.createPendingAccount(requestBody.firstName(), requestBody.lastName(),
      requestBody.email(), institution, role);
    pendingAccountRepository.save(pendingAccount);

    // Initiate a message via rabbit-mq that the user should receive the pending-registration-welcome-email.
    final PendingAccountConfirmationQueue queueDto = new PendingAccountConfirmationQueue(requestBody.email(), requestBody.firstName(),
      requestBody.lastName(), institution.getName(), role.getNameWithoutPrefix());
    queueSender.send(EmailSenderRabbitConfig.EMAIL_SENDING_EXCHANGE_KEY, EmailSenderRabbitConfig.PENDING_ACCOUNT_CONFIRMATION_ROUTING_KEY
      , queueDto);
  }
}
