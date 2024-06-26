package net.tamasnovak.email.constants.templates;

import org.springframework.stereotype.Component;

@Component
public class PdfRequestEmailTemplates {
	public final String STUDENT_PDF_REQUEST_SUBJECT = "Your application summary is ready for download!";
	public final String STUDENT_PDF_REQUEST_BODY = """
    <main>
      <h1>Dear %s,</h1>
      <p>You have submitted a request to download your application data. You may download the file at the following link:</p>
      <a href="%s" target="_blank">CLICK TO DOWNLOAD .PDF</a>
      <p>The file is available for download for the next 72 hours.</p>
      <p>Best regards,<p>
      <p>Daigaku Team</p>
    </main>
  """;

	private PdfRequestEmailTemplates() {}
}
