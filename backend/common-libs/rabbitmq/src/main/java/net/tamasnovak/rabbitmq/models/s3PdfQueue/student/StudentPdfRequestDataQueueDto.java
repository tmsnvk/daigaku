package net.tamasnovak.rabbitmq.models.s3PdfQueue.student;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

public record StudentPdfRequestDataQueueDto(
	UUID authAccountUuid,
	AccountBaseDetails studentAccount,
	List<StudentApplicationDto> applications
) implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;
}
