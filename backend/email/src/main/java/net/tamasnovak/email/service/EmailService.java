package net.tamasnovak.email.service;

import net.tamasnovak.rabbitmq.models.emailQueue.PendingAccountConfirmationQueueDto;
import net.tamasnovak.rabbitmq.models.emailQueue.StudentPdfRequestQueueDto;

public interface EmailService {
	void onStudentPdfRequest(StudentPdfRequestQueueDto newStudentPdfSaveDto);
	void onPendingAccountRegistration(PendingAccountConfirmationQueueDto queueDto);
}
