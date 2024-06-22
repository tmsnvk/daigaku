package net.tamasnovak.rabbitmq.models.queueDto;

import net.tamasnovak.rabbitmq.models.application.StudentApplicationQueueDto;
import net.tamasnovak.rabbitmq.models.student.StudentAccountQueueDto;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

public record StudentPdfSaveQueueDto(
	UUID authAccountUuid,
	StudentAccountQueueDto studentAccount,
	List<StudentApplicationQueueDto> applications
) implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;
}
