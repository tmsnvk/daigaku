/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.rabbitmq.models.emailQueue;

import java.io.Serial;
import java.io.Serializable;

public record StudentPdfRequestQueueDto(
	String fullName,
	String email,
	String pdfDirectDownloadLink
) implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;
}
