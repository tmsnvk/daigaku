package net.tamasnovak.services.documentGenerator.pdf;

import com.itextpdf.html2pdf.HtmlConverter;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;
import net.tamasnovak.domains.support.institution.models.entity.Institution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class PdfServiceImpl implements PdfService{
  private final PdfServiceConstants pdfServiceConstants;

  @Value("${pdf.directory}")
  private String pdfDirectory;

  @Autowired
  public PdfServiceImpl(PdfServiceConstants pdfServiceConstants) {
    this.pdfServiceConstants = pdfServiceConstants;
  }

  @Override
  @Transactional
  public void createStudentApplicationsPdf(Account studentAccount, Institution studentInstitution, UUID authAccountUuid, List<ApplicationDto> applications) {
    try {
      StringBuilder studentData = compileStudentData(studentAccount, studentInstitution);
      StringBuilder applicationData = compileDynamicApplicationData(applications);

      String htmlSource = String.format(pdfServiceConstants.StudentApplicationsCentralTemplate, studentData, applicationData, "date", "time");
      String filePath = Paths.get(pdfDirectory, String.format("%s.pdf", authAccountUuid)).toString();

      HtmlConverter.convertToPdf(htmlSource, new FileOutputStream(filePath));
    } catch (IOException exception) {
      System.out.println(exception.getMessage());
    }
  }

  private StringBuilder compileStudentData(Account studentAccount, Institution studentInstitution) {
    StringBuilder studentData = new StringBuilder();

    studentData.append(String.format(pdfServiceConstants.StudentDataChunk, studentAccount.getFullName(), studentAccount.getEmail(), studentInstitution.getName()));

    return studentData;
  }

  private StringBuilder compileDynamicApplicationData(List<ApplicationDto> applications) {
    StringBuilder applicationData = new StringBuilder();

    for (ApplicationDto application : applications) {
      applicationData.append(String.format(pdfServiceConstants.SingleApplicationDataChunk, application.courseName(), application.accountUuid()));
    }

    return applicationData;
  }
}
