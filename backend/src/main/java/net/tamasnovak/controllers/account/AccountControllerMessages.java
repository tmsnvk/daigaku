package net.tamasnovak.controllers.account;

import org.springframework.stereotype.Service;

@Service
public final class AccountControllerMessages {
  final String FORM_ERROR_MESSAGE = "Your form submission was unsuccessful, please try again.";
  final String PENDING_ACCOUNT_EMAIL_SUBJECT = "Thank you for registering an account at Daigaku!";
  final String PENDING_ACCOUNT_EMAIL_BODY = """
    <main>
      <h1>Welcome at Daigaku!</h1>
      <p>An admin of ours will take a look at your registration request at their earliest convenience. Once this is done, you will receive an email with further instructions. We kindly ask for your patience.</p>
      <p>In the meantime, let us know if we can help with anything.</p>
    </main>
  """;
  final String LOGIN_ERROR_MESSAGE = "Your login was unsuccessful, please try again.";

  private AccountControllerMessages() {}
}
