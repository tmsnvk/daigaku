package net.tamasnovak.services.email;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import net.tamasnovak.dtos.email.SimpleEmailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailService {
  @Value("${spring.mail.username}") private String sender;
  private final JavaMailSender javaMailSender;

  @Autowired
  public EmailService(JavaMailSender javaMailSender) {
    this.javaMailSender = javaMailSender;
  }

  public void sendEmail(SimpleEmailDto simpleEmailDto) {
    try {
      InternetAddress emailAddress = new InternetAddress(simpleEmailDto.recipient());
      emailAddress.validate();

      Properties properties = new Properties();
      Session session = Session.getDefaultInstance(properties);
      MimeMessage mailMessage = new MimeMessage(session);

      mailMessage.setFrom(sender);
      mailMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(simpleEmailDto.recipient()));
      mailMessage.setSubject(simpleEmailDto.subject());
      mailMessage.setContent(simpleEmailDto.body(), "text/html");

      javaMailSender.send(mailMessage);
    } catch (MailSendException | MessagingException exception) {
      throw new MailSendException("Enter a valid email address.");
    }
  }
}
