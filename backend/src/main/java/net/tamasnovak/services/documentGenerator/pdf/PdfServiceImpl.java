package net.tamasnovak.services.documentGenerator.pdf;

import com.itextpdf.html2pdf.HtmlConverter;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;
import net.tamasnovak.domains.support.institution.models.entity.Institution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PdfServiceImpl implements PdfService{
  private final StudentApplicationsConstants studentApplicationsConstants;

  @Value("${pdf.directory}")
  private String pdfDirectory;

  @Autowired
  public PdfServiceImpl(StudentApplicationsConstants studentApplicationsConstants) {
    this.studentApplicationsConstants = studentApplicationsConstants;
  }

  @Override
  @Transactional
  public void createStudentApplicationsPdf(Account studentAccount, Institution studentInstitution, UUID authAccountUuid, List<ApplicationDto> applications) throws FileNotFoundException {
    StringBuilder studentData = compileStudentData(studentAccount, studentInstitution);
    StringBuilder applicationData = compileStudentApplicationsDynamicData(applications);

    LocalDateTime now = LocalDateTime.now();

    String htmlSource = String.format(studentApplicationsConstants.StudentApplicationsCentralTemplate,
      now.toLocalDate(),
      now.toLocalTime(),
      studentData,
      applicationData
    );
    String filePath = Paths.get(pdfDirectory, String.format("%s.pdf", authAccountUuid)).toString();

    HtmlConverter.convertToPdf(htmlSource, new FileOutputStream(filePath));
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
