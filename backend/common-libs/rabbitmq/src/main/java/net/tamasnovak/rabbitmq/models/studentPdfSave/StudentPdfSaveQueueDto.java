package net.tamasnovak.rabbitmq.models.studentPdfSave;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

public record StudentPdfSaveQueueDto(
	UUID authAccountUuid,
	StudentAccountDto studentAccount,
	List<StudentApplicationDto> applications
) implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;
}
