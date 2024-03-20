package net.tamasnovak.controllers.pendingAccount;

import org.springframework.stereotype.Component;

@Component
public final class PendingAccountControllerConstants {
  final String PENDING_ACCOUNT_EMAIL_SUBJECT = "Thank you for registering an account at Daigaku!";
  final String PENDING_ACCOUNT_EMAIL_BODY = """
    <main>
      <h1>Welcome at Daigaku!</h1>
      <p>An admin of ours will take a look at your registration request at their earliest convenience. Once this is done, you will receive an email with further instructions regarding the platform and its usage. We kindly ask for your patience.</p>
      <p>In the meantime, let us know if we can help with anything.</p>
      <p>Best regards,<p>
      <p>Daigaku Team</p>
    </main>
  """;

  PendingAccountControllerConstants() {}
}
