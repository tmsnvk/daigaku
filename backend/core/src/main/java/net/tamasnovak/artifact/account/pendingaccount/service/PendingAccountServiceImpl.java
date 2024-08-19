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
import net.tamasnovak.rabbitmq.models.emailQueue.PendingAccountConfirmationQueueDto;
import net.tamasnovak.rabbitmq.service.QueueSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "PendingAccountService")
public class PendingAccountServiceImpl implements PendingAccountService {
  private final AccountService accountService;
  private final InstitutionService institutionService;
  private final RoleService roleService;
  private final QueueSender queueSender;
  private final PendingAccountRepository pendingAccountRepository;
  private final PendingAccountServiceConstants pendingAccountServiceConstants;

  @Autowired
  public PendingAccountServiceImpl(AccountService accountService, InstitutionService institutionService, RoleService roleService, QueueSender queueSender, PendingAccountRepository pendingAccountRepository, PendingAccountServiceConstants pendingAccountServiceConstants) {
    this.accountService = accountService;
    this.institutionService = institutionService;
    this.roleService = roleService;
    this.queueSender = queueSender;
    this.pendingAccountRepository = pendingAccountRepository;
    this.pendingAccountServiceConstants = pendingAccountServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public void verifyAccountNotExistsByEmail(final String email) {
    final boolean isPendingAccountExists = pendingAccountRepository.existsByEmail(email);

    if (isPendingAccountExists) {
      throw new DataIntegrityViolationException(pendingAccountServiceConstants.EMAIL_ALREADY_EXISTS);
    }
  }

  @Override
  @Transactional
  public void create(final PendingAccountRegistration requestBody) {
    accountService.verifyAccountNotExistsByEmail(requestBody.email());
    verifyAccountNotExistsByEmail(requestBody.email());

    final Institution institution = institutionService.getByUuid(requestBody.institutionUuid());
    final Role role = roleService.getByUuid(requestBody.accountRoleUuid());

    final PendingAccount pendingAccount = PendingAccount.createPendingAccount(requestBody.firstName(), requestBody.lastName(), requestBody.email(), institution, role);
    pendingAccountRepository.save(pendingAccount);

    final PendingAccountConfirmationQueueDto queueDto = new PendingAccountConfirmationQueueDto(requestBody.email(), requestBody.firstName(), requestBody.lastName(), institution.getName(), role.getNameWithoutPrefix());

    queueSender.send(EmailSenderRabbitConfig.EMAIL_SENDING_EXCHANGE_KEY, EmailSenderRabbitConfig.PENDING_ACCOUNT_CONFIRMATION_ROUTING_KEY, queueDto);
  }
}
