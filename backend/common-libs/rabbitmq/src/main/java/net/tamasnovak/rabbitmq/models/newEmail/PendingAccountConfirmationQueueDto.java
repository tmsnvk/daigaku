package net.tamasnovak.rabbitmq.models.newEmail;

import java.io.Serial;
import java.io.Serializable;

public record PendingAccountConfirmationQueueDto(
	String email,
	String firstName,
	String lastName,
	String institutionName,
	String roleName
) implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;
}
