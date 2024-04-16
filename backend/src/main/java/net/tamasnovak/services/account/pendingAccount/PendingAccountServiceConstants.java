package net.tamasnovak.services.account.pendingAccount;

import org.springframework.stereotype.Component;

@Component
public final class PendingAccountServiceConstants {
  final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system.";
  final String NOT_VALID_INSTITUTION = "Select a valid institution.";
  final String PENDING_ACCOUNT_EMAIL_SUBJECT = "Thank you for registering an account at Daigaku!";
  final String PENDING_ACCOUNT_EMAIL_BODY = """
    <main>
      <h1>Welcome at Daigaku!</h1>
      <p>You have submitted a registration with the following data:</p>
      <p><span>First name: </span><span>%s</span></p>
      <p><span>Last name: </span><span>%s</span></p>
      <p><span>Institution: </span><span>%s</span></p>
      <p>An admin from your selected institution will take a look at your registration request at their earliest convenience. Once this is done, you will receive an email with further instructions regarding the platform and its usage. We kindly ask for your patience.</p>
      <p>In the meantime, let us know if we can help with anything.</p>
      <p>Best regards,<p>
      <p>Daigaku Team</p>
    </main>
  """;

  private PendingAccountServiceConstants() {}
}
