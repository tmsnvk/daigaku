package net.tamasnovak.email.service;

import net.tamasnovak.email.dto.SimpleEmail;
import net.tamasnovak.email.template.AccountEmailTemplates;
import net.tamasnovak.email.utilities.EmailUtilities;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.EmailSenderRabbitConfig;
import net.tamasnovak.rabbitmq.models.emailQueue.PendingAccountConfirmationQueue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountQueueServiceImpl implements AccountQueueService {
	private final EmailUtilities emailUtilities;
	private final AccountEmailTemplates accountEmailTemplates;

	@Autowired
	public AccountQueueServiceImpl(EmailUtilities emailUtilities, AccountEmailTemplates accountEmailTemplates) {
		this.emailUtilities = emailUtilities;
		this.accountEmailTemplates = accountEmailTemplates;
	}

	@Override
	@Transactional
	@RabbitListener(queues = { EmailSenderRabbitConfig.PENDING_ACCOUNT_CONFIRMATION_QUEUE_KEY })
	public void onPendingAccountRegistration(final PendingAccountConfirmationQueue queueDto) {
		final String emailBody = createPendingAccountRegistrationEmailBody(accountEmailTemplates.PENDING_ACCOUNT_CONFIRMATION_BODY, queueDto);
		final SimpleEmail email = new SimpleEmail(queueDto.email(), accountEmailTemplates.PENDING_ACCOUNT_CONFIRMATION_SUBJECT, emailBody);

		emailUtilities.sendSimpleEmail(email);
	}

	private String createPendingAccountRegistrationEmailBody(String htmlBody, PendingAccountConfirmationQueue queueDto) {
		return String.format(htmlBody, queueDto.firstName(), queueDto.lastName(), queueDto.institutionName(), queueDto.roleName());
	}
}
