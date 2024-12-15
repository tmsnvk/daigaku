/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.email.constants;

import org.springframework.stereotype.Component;

@Component
public class EmailConstants {
  public final String SENDING_EXCEPTION = "There was an error with our email server. We will get in touch with you as soon as possible.";

  private EmailConstants() {}
}
