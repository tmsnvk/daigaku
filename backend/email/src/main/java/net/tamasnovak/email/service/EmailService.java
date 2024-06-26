package net.tamasnovak.email.service;

import net.tamasnovak.rabbitmq.models.newEmail.NewStudentPdfSaveDto;

public interface EmailService {
	void onStudentPdfSave(NewStudentPdfSaveDto newStudentPdfSaveDto);
}
