/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.s3module.services.pdf;

import org.springframework.stereotype.Service;

@Service
public class PdfServiceConstants {
  public final String PDF_ERROR = "An error happened while generating the requested data. Refresh your browser and try again. If the error persists, get in touch with our admin team.";

  private PdfServiceConstants() {}
}
