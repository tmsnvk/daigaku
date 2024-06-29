package net.tamasnovak.email.service;

import net.tamasnovak.rabbitmq.models.newEmail.NewStudentPdfSaveDto;
import net.tamasnovak.rabbitmq.models.newEmail.PendingAccountConfirmationQueueDto;

public interface EmailService {
	void onStudentPdfSave(NewStudentPdfSaveDto newStudentPdfSaveDto);
	void onPendingAccountRegistration(PendingAccountConfirmationQueueDto queueDto);
}
