package net.tamasnovak.services.documentGenerator.pdf;

import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;

import java.util.List;
import java.util.UUID;

public interface PdfService {
  void createStudentApplicationsPdf(UUID authAccountUuid, List<ApplicationDto> applications);
}
