package net.tamasnovak.email.service;

import net.tamasnovak.email.dto.SimpleEmail;
import net.tamasnovak.email.template.PdfEmailTemplates;
import net.tamasnovak.email.utilities.EmailUtilities;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.EmailSenderRabbitConfig;
import net.tamasnovak.rabbitmq.models.emailQueue.StudentPdfRequestQueueDto;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PdfQueueServiceImpl implements PdfQueueService {
	private final EmailUtilities emailUtilities;
	private final PdfEmailTemplates pdfEmailTemplates;

	@Autowired
	public PdfQueueServiceImpl(EmailUtilities emailUtilities, PdfEmailTemplates pdfEmailTemplates) {
		this.emailUtilities = emailUtilities;
		this.pdfEmailTemplates = pdfEmailTemplates;
	}

	@Override
	@Transactional
	@RabbitListener(queues = { EmailSenderRabbitConfig.EMAIL_STUDENT_PDF_SAVE_QUEUE_KEY })
	public void onStudentPdfRequest(final StudentPdfRequestQueueDto queueDto) {
		final String emailBody = createStudentPdfEmailBody(pdfEmailTemplates.STUDENT_PDF_BODY, queueDto);
		final SimpleEmail email = new SimpleEmail(queueDto.email(), pdfEmailTemplates.STUDENT_PDF_SUBJECT, emailBody);

		emailUtilities.sendSimpleEmail(email);
	}

	private String createStudentPdfEmailBody(String htmlBody, StudentPdfRequestQueueDto queueDto) {
		return String.format(htmlBody, queueDto.fullName(), queueDto.pdfDirectDownloadLink());
	}
}
