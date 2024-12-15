/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.s3module.services.pdf.student;

import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.StudentPdfRequestDataQueueDto;

public interface StudentPdfService {
  void onStudentPdfRequest(StudentPdfRequestDataQueueDto messageQueueDto);
}
