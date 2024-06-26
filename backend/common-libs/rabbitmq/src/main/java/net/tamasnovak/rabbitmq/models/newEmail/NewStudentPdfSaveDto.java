package net.tamasnovak.rabbitmq.models.newEmail;

import java.io.Serial;
import java.io.Serializable;

public record NewStudentPdfSaveDto(
	String fullName,
	String email,
	String pdfDirectDownloadLink
) implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;
}
