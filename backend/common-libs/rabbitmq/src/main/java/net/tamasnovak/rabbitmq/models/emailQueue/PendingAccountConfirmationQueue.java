/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.rabbitmq.models.emailQueue;

import java.io.Serial;
import java.io.Serializable;

public record PendingAccountConfirmationQueue(
	String email,
	String firstName,
	String lastName,
	String institutionName,
	String roleName
) implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;
}
