package net.tamasnovak.services.documentGenerator.pdf;

import com.itextpdf.html2pdf.HtmlConverter;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;
import net.tamasnovak.domains.support.institution.models.entity.Institution;
import net.tamasnovak.services.amazonS3Service.AmazonS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PdfServiceImpl implements PdfService {
  private final AmazonS3Service amazonS3Service;
  private final PdfServiceConstants pdfServiceConstants;
  private final StudentApplicationsConstants studentApplicationsConstants;

  @Autowired
  public PdfServiceImpl(AmazonS3Service amazonS3Service, PdfServiceConstants pdfServiceConstants, StudentApplicationsConstants studentApplicationsConstants) {
    this.amazonS3Service = amazonS3Service;
    this.pdfServiceConstants = pdfServiceConstants;
    this.studentApplicationsConstants = studentApplicationsConstants;
  }

  @Override
  @Transactional
  public void createStudentApplicationsPdf(Account studentAccount, Institution studentInstitution, UUID authAccountUuid, List<ApplicationDto> applications) {
    try {
      StringBuilder studentData = compileStudentData(studentAccount, studentInstitution);
      StringBuilder applicationData = compileStudentApplicationsDynamicData(applications);

      LocalDateTime now = LocalDateTime.now();

      String htmlSource = String.format(studentApplicationsConstants.StudentApplicationsCentralTemplate,
        now.toLocalDate(),
        now.toLocalTime(),
        studentData,
        applicationData
      );

      File file = new File(String.format("%s.pdf", authAccountUuid));
      HtmlConverter.convertToPdf(htmlSource, new FileOutputStream(file));

      amazonS3Service.uploadFileToS3Bucket(file.toString(), file);
    } catch (IOException exception) {
      throw new IllegalStateException(pdfServiceConstants.PDF_ERROR);
    }
  }

  private StringBuilder compileStudentData(Account studentAccount, Institution studentInstitution) {
    StringBuilder studentData = new StringBuilder();

    studentData.append(
      String.format(studentApplicationsConstants.StudentDataChunk,
        studentAccount.getFullName(),
        studentAccount.getEmail(),
        studentInstitution.getName()
      )
    );

    return studentData;
  }

  private StringBuilder compileStudentApplicationsDynamicData(List<ApplicationDto> applications) {
    StringBuilder applicationData = new StringBuilder();

    for (ApplicationDto application : applications) {
      applicationData.append(
        String.format(studentApplicationsConstants.SingleApplicationDataChunk,
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
