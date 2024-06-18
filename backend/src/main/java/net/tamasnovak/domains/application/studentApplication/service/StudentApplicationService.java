package net.tamasnovak.domains.application.studentApplication.service;

import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;
import net.tamasnovak.domains.application.studentApplication.models.dtoRequests.NewApplicationByStudentDto;
import net.tamasnovak.domains.application.studentApplication.models.dtoRequests.UpdateApplicationByStudentDto;
import net.tamasnovak.domains.application.studentApplication.models.dtoResponses.StudentDashboardDataDto;

import java.util.List;
import java.util.UUID;

public interface StudentApplicationService {
  List<ApplicationDto> getAllApplicationDtosByAccountUuid(UUID authAccountUuid);

  void toggleIsRemovableByApplicationUuid(String uuid);

  StudentDashboardDataDto getAggregateDataByAccount(Account account);

  ApplicationDto create(Account account, NewApplicationByStudentDto requestBody);

  ApplicationDto updateAndRetrieveByUuid(String uuid, UpdateApplicationByStudentDto requestBody, Account account);

  void handleApplicationDownloadRequest(UUID authAccountUuid);
}
