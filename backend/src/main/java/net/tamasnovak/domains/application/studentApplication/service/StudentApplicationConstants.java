package net.tamasnovak.domains.application.studentApplication.service;

import org.springframework.stereotype.Component;

@Component
public final class StudentApplicationConstants {
  final String UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY = "Invalid country/university match is found. Resubmit your application with valid values.";
  final String STUDENT_PDF_EMAIL_SUBJECT = "Your applications PDF is ready for download!";
  final String STUDENT_PDF_EMAIL_BODY = """
    <main>
      <h1>Dear %s,</h1>
      <p>You have requested to download your applications data. You may download the file at the following link:</p>
      <a href="%s" target="_blank">CLICK TO DOWNLOAD .PDF</a>
      <p>The file is available for download for the next 72 hours.</p>
      <p>Best regards,<p>
      <p>Daigaku Team</p>
    </main>
  """;

  private StudentApplicationConstants() {}
}
