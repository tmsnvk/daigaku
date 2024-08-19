package net.tamasnovak.domain.account.pendingaccount.service;

import net.tamasnovak.domain.account.account.service.AccountService;
import net.tamasnovak.domain.account.pendingaccount.dto.PendingAccountRegistration;
import net.tamasnovak.domain.account.pendingaccount.entity.PendingAccount;
import net.tamasnovak.domain.account.pendingaccount.persistence.PendingAccountRepository;
import net.tamasnovak.domain.role.entity.Role;
import net.tamasnovak.domain.role.service.RoleService;
import net.tamasnovak.domain.support.institution.entity.Institution;
import net.tamasnovak.domain.support.institution.service.InstitutionService;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.EmailSenderRabbitConfig;
import net.tamasnovak.rabbitmq.models.emailQueue.PendingAccountConfirmationQueue;
import net.tamasnovak.rabbitmq.service.QueueSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Qualifier(value = "PendingAccountService")
public class PendingAccountServiceImpl implements PendingAccountService {
  private final AccountService accountService;
  private final InstitutionService institutionService;
  private final RoleService roleService;
  private final QueueSender queueSender;
  private final PendingAccountRepository pendingAccountRepository;
  private final PendingAccountServiceConstants constants;

  @Autowired
  public PendingAccountServiceImpl(AccountService accountService, InstitutionService institutionService, RoleService roleService, QueueSender queueSender, PendingAccountRepository pendingAccountRepository, PendingAccountServiceConstants constants) {
    this.accountService = accountService;
    this.institutionService = institutionService;
    this.roleService = roleService;
    this.queueSender = queueSender;
    this.pendingAccountRepository = pendingAccountRepository;
    this.constants = constants;
  }

  @Override
  @Transactional(readOnly = true)
  public void verifyAccountNotExistsByEmail(final String email) {
    final boolean isPendingAccountExists = pendingAccountRepository.existsByEmail(email);

    if (isPendingAccountExists) {
      throw new DataIntegrityViolationException(constants.EMAIL_ALREADY_EXISTS);
    }
  }

  @Override
  @Transactional
  public void create(final PendingAccountRegistration body) {
    accountService.verifyAccountNotExistsByEmail(body.email());
    verifyAccountNotExistsByEmail(body.email());

    final Institution institution = institutionService.getByUuid(UUID.fromString(body.institutionUuid()));
    final Role role = roleService.getByUuid(UUID.fromString(body.accountRoleUuid()));

    final PendingAccount pendingAccount = PendingAccount.createPendingAccount(
      body.firstName(),
      body.lastName(),
      body.email(),
      institution,
      role);
    pendingAccountRepository.save(pendingAccount);

    final PendingAccountConfirmationQueue queueDto = new PendingAccountConfirmationQueue(
      body.email(),
      body.firstName(),
      body.lastName(),
      institution.getName(),
      role.getNameWithoutPrefix());
    queueSender.send(EmailSenderRabbitConfig.EMAIL_SENDING_EXCHANGE_KEY, EmailSenderRabbitConfig.PENDING_ACCOUNT_CONFIRMATION_ROUTING_KEY, queueDto);
  }
}
