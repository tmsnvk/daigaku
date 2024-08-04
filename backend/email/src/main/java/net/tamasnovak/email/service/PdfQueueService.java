package net.tamasnovak.email.service;

import net.tamasnovak.rabbitmq.models.emailQueue.StudentPdfRequestQueueDto;

public interface PdfQueueService {
	void onStudentPdfRequest(StudentPdfRequestQueueDto queueDto);
}
