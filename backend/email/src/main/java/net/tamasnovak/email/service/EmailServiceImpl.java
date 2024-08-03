package net.tamasnovak.email.service;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import net.tamasnovak.email.constants.constants.EmailConstants;
import net.tamasnovak.email.models.SimpleEmailDto;
import net.tamasnovak.email.constants.templates.AccountEmailTemplates;
import net.tamasnovak.email.constants.templates.PdfRequestEmailTemplates;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.EmailSenderRabbitConfig;
import net.tamasnovak.rabbitmq.models.emailQueue.PendingAccountConfirmationQueueDto;
import net.tamasnovak.rabbitmq.models.emailQueue.StudentPdfRequestQueueDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);
	@Value("${spring.mail.username}")
	private String sender;

	private final JavaMailSender javaMailSender;
	private final EmailConstants emailConstants;
	private final PdfRequestEmailTemplates pdfRequestEmailTemplates;
	private final AccountEmailTemplates accountEmailTemplates;

	@Autowired
	public EmailServiceImpl(JavaMailSender javaMailSender, EmailConstants emailConstants, PdfRequestEmailTemplates pdfRequestEmailTemplates, AccountEmailTemplates accountEmailTemplates) {
		this.javaMailSender = javaMailSender;
		this.emailConstants = emailConstants;
		this.pdfRequestEmailTemplates = pdfRequestEmailTemplates;
		this.accountEmailTemplates = accountEmailTemplates;
	}

	@Override
	@Transactional
	@RabbitListener(queues = { EmailSenderRabbitConfig.EMAIL_STUDENT_PDF_SAVE_QUEUE_KEY })
	public void onStudentPdfRequest(StudentPdfRequestQueueDto queueDto) {
		String emailBody = String.format(pdfRequestEmailTemplates.STUDENT_PDF_REQUEST_BODY, queueDto.fullName(), queueDto.pdfDirectDownloadLink());
		SimpleEmailDto emailDto = new SimpleEmailDto(queueDto.email(), pdfRequestEmailTemplates.STUDENT_PDF_REQUEST_SUBJECT, emailBody);

		this.sendSimpleEmail(emailDto);
	}

	@Override
	@Transactional
	@RabbitListener(queues = { EmailSenderRabbitConfig.PENDING_ACCOUNT_CONFIRMATION_QUEUE_KEY })
	public void onPendingAccountRegistration(PendingAccountConfirmationQueueDto queueDto) {
		String emailBody = String.format(accountEmailTemplates.PENDING_ACCOUNT_CONFIRMATION_BODY, queueDto.firstName(), queueDto.lastName(), queueDto.institutionName(), queueDto.roleName());
		SimpleEmailDto emailDto = new SimpleEmailDto(queueDto.email(), accountEmailTemplates.PENDING_ACCOUNT_CONFIRMATION_SUBJECT, emailBody);

		this.sendSimpleEmail(emailDto);
	}

	private void sendSimpleEmail(SimpleEmailDto emailDto) {
		try {
			InternetAddress emailAddress = new InternetAddress(emailDto.recipient());
			emailAddress.validate();

			Properties properties = new Properties();
			Session session = Session.getDefaultInstance(properties);
			MimeMessage mailMessage = new MimeMessage(session);

			mailMessage.setFrom(sender);
			mailMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(emailDto.recipient()));
			mailMessage.setSubject(emailDto.subject());
			mailMessage.setContent(emailDto.body(), "text/html; charset=UTF-8");

			javaMailSender.send(mailMessage);
		} catch (MailException | MessagingException exception) {
			throw new MailSendException(emailConstants.FAILED_EMAIL_SENDING);
		}
	}
}
