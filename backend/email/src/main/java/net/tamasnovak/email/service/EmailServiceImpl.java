package net.tamasnovak.email.service;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import net.tamasnovak.email.constants.AccountEmailSendingTemplates;
import net.tamasnovak.email.constants.PdfSendingEmailTemplates;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.EmailSendingRabbitConfig;
import net.tamasnovak.rabbitmq.models.newEmail.NewEmailQueueDto;
import net.tamasnovak.rabbitmq.models.newEmail.NewStudentPdfSaveDto;
import net.tamasnovak.rabbitmq.models.newEmail.PendingAccountConfirmationQueueDto;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {
	@Value("${spring.mail.username}")
	private String sender;
	private final JavaMailSender javaMailSender;
	private final EmailConstants emailConstants;
	private final PdfSendingEmailTemplates pdfSendingEmailTemplates;
	private final AccountEmailSendingTemplates accountEmailSendingTemplates;

	@Autowired
	public EmailServiceImpl(JavaMailSender javaMailSender, EmailConstants emailConstants, PdfSendingEmailTemplates pdfSendingEmailTemplates, AccountEmailSendingTemplates accountEmailSendingTemplates) {
		this.javaMailSender = javaMailSender;
		this.emailConstants = emailConstants;
		this.pdfSendingEmailTemplates = pdfSendingEmailTemplates;
		this.accountEmailSendingTemplates = accountEmailSendingTemplates;
	}

	@Override
	@Transactional
	@RabbitListener(queues = { EmailSendingRabbitConfig.EMAIL_STUDENT_PDF_SAVE_QUEUE_KEY })
	public void onStudentPdfSave(NewStudentPdfSaveDto newStudentPdfSaveDto) {
		String emailBody = String.format(pdfSendingEmailTemplates.STUDENT_PDF_EMAIL_BODY, newStudentPdfSaveDto.fullName(), newStudentPdfSaveDto.pdfDirectDownloadLink());
		NewEmailQueueDto newEmailQueueDto = new NewEmailQueueDto(newStudentPdfSaveDto.email(), pdfSendingEmailTemplates.STUDENT_PDF_EMAIL_SUBJECT, emailBody);

		this.sendSimpleEmail(newEmailQueueDto);
	}

	@Override
	@Transactional
	@RabbitListener(queues = { EmailSendingRabbitConfig.PENDING_ACCOUNT_CONFIRMATION_QUEUE_KEY })
	public void onPendingAccountRegistration(PendingAccountConfirmationQueueDto queueDto) {
		String emailBody = String.format(accountEmailSendingTemplates.PENDING_ACCOUNT_CONFIRMATION_EMAIL_BODY, queueDto.firstName(), queueDto.lastName(), queueDto.institutionName(), queueDto.roleName());
		NewEmailQueueDto newEmailQueueDto = new NewEmailQueueDto(queueDto.email(), accountEmailSendingTemplates.PENDING_ACCOUNT_CONFIRMATION_EMAIL_SUBJECT, emailBody);

		this.sendSimpleEmail(newEmailQueueDto);
	}

	private void sendSimpleEmail(NewEmailQueueDto newEmailQueueDto) {
		try {
			InternetAddress emailAddress = new InternetAddress(newEmailQueueDto.recipient());
			emailAddress.validate();

			Properties properties = new Properties();
			Session session = Session.getDefaultInstance(properties);
			MimeMessage mailMessage = new MimeMessage(session);

			mailMessage.setFrom(sender);
			mailMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(newEmailQueueDto.recipient()));
			mailMessage.setSubject(newEmailQueueDto.subject());

			mailMessage.setContent(newEmailQueueDto.body(), "text/html; charset=UTF-8");

			javaMailSender.send(mailMessage);
		} catch (MailException | MessagingException exception) {
			throw new MailSendException(emailConstants.FAILED_EMAIL_SENDING);
		}
	}
}
