package net.tamasnovak.s3module.services.pdf.student;

import com.itextpdf.html2pdf.HtmlConverter;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.EmailSendingRabbitConfig;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.PdfSaveRabbitConfig;
import net.tamasnovak.rabbitmq.models.newEmail.NewStudentPdfSaveDto;
import net.tamasnovak.rabbitmq.models.studentPdfSave.StudentApplicationDto;
import net.tamasnovak.rabbitmq.models.studentPdfSave.StudentPdfSaveQueueDto;
import net.tamasnovak.rabbitmq.service.queueSender.QueueSender;
import net.tamasnovak.s3module.services.amazonS3Service.AmazonS3Service;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class StudentPdfServiceImpl implements StudentPdfService {
  @Value("${aws.endpointUrl}")
  private String endpointUrlRoot;

  private final AmazonS3Service amazonS3Service;
  private final QueueSender queueSender;
  private final PdfServiceConstants pdfServiceConstants;
  private final StudentApplicationsConstants studentApplicationsConstants;

  @Autowired
  public StudentPdfServiceImpl(AmazonS3Service amazonS3Service, QueueSender queueSender, PdfServiceConstants pdfServiceConstants, StudentApplicationsConstants studentApplicationsConstants) {
    this.amazonS3Service = amazonS3Service;
	  this.queueSender = queueSender;
	  this.pdfServiceConstants = pdfServiceConstants;
    this.studentApplicationsConstants = studentApplicationsConstants;
  }

  @Override
  @Transactional
  @RabbitListener(queues = { PdfSaveRabbitConfig.STUDENT_PDF_SAVE_QUEUE_KEY })
  public void createStudentApplicationsPdf(StudentPdfSaveQueueDto messageQueueDto) {
    try {
      StringBuilder studentData = compileStudentData(messageQueueDto);
      StringBuilder applicationData = compileStudentApplicationsDynamicData(messageQueueDto);

      LocalDateTime now = LocalDateTime.now();

      String htmlSource = String.format(studentApplicationsConstants.STUDENT_APPLICATION_HTML_MAIN_TEMPLATE,
        now.toLocalDate(),
        now.toLocalTime(),
        studentData,
        applicationData
      );

      File file = new File(String.format("%s.pdf", messageQueueDto.authAccountUuid()));
      HtmlConverter.convertToPdf(htmlSource, new FileOutputStream(file));

      amazonS3Service.uploadFileToS3Bucket(file.toString(), file);

      file.delete();

      NewStudentPdfSaveDto newStudentPdfSaveDto = new NewStudentPdfSaveDto(
        messageQueueDto.studentAccount().fullName(),
        messageQueueDto.studentAccount().email(),
        endpointUrlRoot + String.format("%s.pdf", messageQueueDto.authAccountUuid())
      );

      queueSender.send(
        EmailSendingRabbitConfig.EMAIL_STUDENT_PDF_SAVE_EXCHANGE_KEY,
        EmailSendingRabbitConfig.EMAIL_STUDENT_PDF_SAVE_ROUTING_KEY,
        newStudentPdfSaveDto
      );
    } catch (IOException exception) {
      throw new IllegalStateException(pdfServiceConstants.PDF_ERROR);
    }
  }

  private StringBuilder compileStudentData(StudentPdfSaveQueueDto messageQueueDto) {
    StringBuilder studentData = new StringBuilder();

    studentData.append(
      String.format(studentApplicationsConstants.STUDENT_HTML_STUDENT_DATA,
        messageQueueDto.studentAccount().fullName(),
        messageQueueDto.studentAccount().email(),
        messageQueueDto.studentAccount().institutionName()
      )
    );

    return studentData;
  }

  private StringBuilder compileStudentApplicationsDynamicData(StudentPdfSaveQueueDto messageQueueDto) {
    StringBuilder applicationData = new StringBuilder();

    for (StudentApplicationDto application : messageQueueDto.applications()) {
      applicationData.append(
        String.format(studentApplicationsConstants.STUDENT_HTML_APPLICATIONS_DATA,
          application.createdAt(),
          application.lastUpdatedAt(),
          application.courseName(),
          application.university(),
          application.country(),
          application.applicationStatus(),
          application.interviewStatus(),
          application.offerStatus(),
          application.responseStatus(),
          application.finalDestinationStatus()
        )
      );
    }

    return applicationData;
  }
}
