package net.tamasnovak.s3module.services.pdf.student;

import net.tamasnovak.rabbitmq.models.queueDto.StudentPdfSaveQueueDto;

public interface StudentPdfService {
  void createStudentApplicationsPdf(StudentPdfSaveQueueDto messageQueueDto);
}
