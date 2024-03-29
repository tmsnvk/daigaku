package net.tamasnovak.services.email;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import net.tamasnovak.dtos.email.NewEmailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {
  @Value("${spring.mail.username}") private String sender;
  private final JavaMailSender javaMailSender;
  private final EmailServiceConstants emailServiceConstants;

  @Autowired
  public EmailServiceImpl(JavaMailSender javaMailSender, EmailServiceConstants emailServiceConstants) {
    this.javaMailSender = javaMailSender;
    this.emailServiceConstants = emailServiceConstants;
  }

  @Override
  public void sendEmail(NewEmailDto newEmailDto) {
    try {
      InternetAddress emailAddress = new InternetAddress(newEmailDto.recipient());
      emailAddress.validate();

      Properties properties = new Properties();
      Session session = Session.getDefaultInstance(properties);
      MimeMessage mailMessage = new MimeMessage(session);

      mailMessage.setFrom(sender);
      mailMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(newEmailDto.recipient()));
      mailMessage.setSubject(newEmailDto.subject());
      mailMessage.setContent(newEmailDto.body(), "text/html");

      javaMailSender.send(mailMessage);
    } catch (MailException | MessagingException exception) {
      throw new MailSendException(emailServiceConstants.FAILED_EMAIL_SENDING);
    }
  }
}
