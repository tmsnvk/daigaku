package net.tamasnovak.email.constants.constants;

import org.springframework.stereotype.Service;

@Service
public final class EmailConstants {
  public final String FAILED_EMAIL_SENDING = "There was an error with our email server. We will get in touch with you as soon as possible.";

  private EmailConstants() {}
}
