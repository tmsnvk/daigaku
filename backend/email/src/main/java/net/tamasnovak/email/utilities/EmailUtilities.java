/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.email.utilities;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import net.tamasnovak.email.dto.SimpleEmail;
import net.tamasnovak.email.constants.EmailConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Component
public class EmailUtilities {
	@Value("${spring.mail.username}")
	private String sender;

	private final JavaMailSender javaMailSender;
	private final EmailConstants emailConstants;

	@Autowired
	public EmailUtilities(JavaMailSender javaMailSender, EmailConstants emailConstants) {
		this.javaMailSender = javaMailSender;
		this.emailConstants = emailConstants;
	}

	public void sendSimpleEmail(final SimpleEmail emailDto) {
		try {
			final InternetAddress emailAddress = new InternetAddress(emailDto.recipient());
			emailAddress.validate();

			final MimeMessage mimeMessage = new MimeMessage(Session.getDefaultInstance(new Properties()));
			mimeMessage.setFrom(sender);
			mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(emailDto.recipient()));
			mimeMessage.setSubject(emailDto.subject());
			mimeMessage.setContent(emailDto.body(), "text/html; charset=UTF-8");

			javaMailSender.send(mimeMessage);
		} catch (MailException | MessagingException exception) {
			throw new MailSendException(emailConstants.SENDING_EXCEPTION);
		}
	}
}
