package net.tamasnovak.s3module.services.pdf.student;

import com.itextpdf.html2pdf.HtmlConverter;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.EmailSenderRabbitConfig;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.PdfRequestRabbitConfig;
import net.tamasnovak.rabbitmq.models.emailQueue.StudentPdfRequestQueueDto;
import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.StudentApplicationDto;
import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.StudentPdfRequestDataQueueDto;
import net.tamasnovak.rabbitmq.service.QueueSender;
import net.tamasnovak.s3module.services.amazonS3Service.AmazonS3Service;
import net.tamasnovak.s3module.services.pdf.PdfServiceConstants;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.S3Client;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class StudentPdfServiceImpl implements StudentPdfService {
  @Value("${aws.endpointUrl}")
  private String endpointUrlRoot;

  private final AmazonS3Service s3Service;
  private final QueueSender queueSender;
  private final PdfServiceConstants pdfServiceConstants;
  private final StudentApplicationsConstants studentApplicationsConstants;

  @Autowired
  public StudentPdfServiceImpl(AmazonS3Service s3Service, QueueSender queueSender, PdfServiceConstants pdfServiceConstants, StudentApplicationsConstants studentApplicationsConstants) {
    this.s3Service = s3Service;
	  this.queueSender = queueSender;
	  this.pdfServiceConstants = pdfServiceConstants;
    this.studentApplicationsConstants = studentApplicationsConstants;
  }

  @Override
  @Transactional
  @RabbitListener(queues = { PdfRequestRabbitConfig.STUDENT_PDF_SAVE_QUEUE_KEY })
  public void onStudentPdfRequest(StudentPdfRequestDataQueueDto queueDto) {
    s3Service.removeOldPdfFiles();

    try {
      StringBuilder studentData = compileStudentData(queueDto);
      StringBuilder applicationData = compileStudentApplicationsData(queueDto);

      LocalDateTime now = LocalDateTime.now();

      String htmlSource = String.format(studentApplicationsConstants.STUDENT_REQUEST_MAIN_TEMPLATE,
        now.toLocalDate(),
        now.toLocalTime(),
        studentData,
        applicationData
      );

      File file = new File(String.format("%s.pdf", queueDto.authAccountUuid()));
      HtmlConverter.convertToPdf(htmlSource, new FileOutputStream(file));

      s3Service.uploadFileToS3Bucket(file.toString(), file);

      file.delete();

      StudentPdfRequestQueueDto pdfRequestQueueDto = new StudentPdfRequestQueueDto(
        queueDto.studentAccount().fullName(),
        queueDto.studentAccount().email(),
        endpointUrlRoot + String.format("%s.pdf", queueDto.authAccountUuid())
      );

      queueSender.send(EmailSenderRabbitConfig.EMAIL_SENDING_EXCHANGE_KEY, EmailSenderRabbitConfig.EMAIL_STUDENT_PDF_SAVE_ROUTING_KEY, pdfRequestQueueDto);
    } catch (IOException exception) {
      throw new IllegalStateException(pdfServiceConstants.PDF_ERROR);
    }
  }

  private StringBuilder compileStudentData(StudentPdfRequestDataQueueDto queueDto) {
    StringBuilder data = new StringBuilder();

    data.append(
      String.format(studentApplicationsConstants.STUDENT_REQUEST_STUDENT_DATA,
        queueDto.studentAccount().fullName(),
        queueDto.studentAccount().email(),
        queueDto.studentAccount().institutionName()
      )
    );

    return data;
  }

  private StringBuilder compileStudentApplicationsData(StudentPdfRequestDataQueueDto queueDto) {
    StringBuilder data = new StringBuilder();

    for (StudentApplicationDto application : queueDto.applications()) {
      data.append(
        String.format(studentApplicationsConstants.STUDENT_REQUEST_APPLICATIONS_DATA,
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

    return data;
  }
}
