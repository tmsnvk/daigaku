/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.email.dto;

public record SimpleEmail(
	String recipient,

	String subject,

	String body
) {}
