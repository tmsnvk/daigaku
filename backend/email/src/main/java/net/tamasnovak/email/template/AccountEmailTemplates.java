package net.tamasnovak.email.template;

import org.springframework.stereotype.Component;

@Component
public class AccountEmailTemplates {
	public final String PENDING_ACCOUNT_CONFIRMATION_SUBJECT = "Thank you for registering an account at Daigaku!";
	public final String PENDING_ACCOUNT_CONFIRMATION_BODY = """
		<main>
			<h1>Welcome at Daigaku!</h1>
			<p>You have submitted a registration with the following data:</p>
			<p><span>First name: </span><span>%s</span></p>
			<p><span>Last name: </span><span>%s</span></p>
			<p><span>Institution: </span><span>%s</span></p>
			<p><span>Account Type: </span><span>%s</span></p>
			<p>An admin from your selected institution will take a look at your registration request at their earliest convenience. Once this is done, you will receive an email with further instructions regarding the platform and its usage. We kindly ask for your patience until then.</p>
			<p>In the meantime, let us know if we can help with anything.</p>
			<p>Best regards,<p>
			<p>Daigaku Team</p>
		</main>
	""";

	private AccountEmailTemplates() {}
}
