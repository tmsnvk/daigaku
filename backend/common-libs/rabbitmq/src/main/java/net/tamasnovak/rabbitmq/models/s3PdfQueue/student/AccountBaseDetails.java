/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.rabbitmq.models.s3PdfQueue.student;

public record AccountBaseDetails(
	String fullName,
	String institutionName,
	String email
) {}
