package net.tamasnovak.services.documentGenerator.pdf;

import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;
import net.tamasnovak.domains.support.institution.models.entity.Institution;

import java.util.List;
import java.util.UUID;

public interface PdfService {
  void createStudentApplicationsPdf(Account studentAccount, Institution studentInstitution, UUID authAccountUuid, List<ApplicationDto> applications);
}
