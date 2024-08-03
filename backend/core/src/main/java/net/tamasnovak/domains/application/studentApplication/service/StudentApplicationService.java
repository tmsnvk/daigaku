package net.tamasnovak.domains.application.studentApplication.service;

import net.tamasnovak.domains.account.account.entity.Account;
import net.tamasnovak.domains.application.shared.dto.ApplicationData;
import net.tamasnovak.domains.application.studentApplication.dto.NewApplicationByStudent;
import net.tamasnovak.domains.application.studentApplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.domains.application.studentApplication.dto.StudentDashboardData;

import java.util.List;
import java.util.UUID;

public interface StudentApplicationService {
  List<ApplicationData> getAllApplicationResponsesByAccountUuid(UUID authAccountUuid);

  void toggleIsRemovableByApplicationUuid(String uuid);

  StudentDashboardData getAggregateDataByAccount(Account account);

  ApplicationData create(Account account, NewApplicationByStudent requestBody);

  ApplicationData updateAndRetrieveByUuid(String uuid, UpdateApplicationByStudent requestBody, Account account);

  void onApplicationDownloadRequest(UUID authAccountUuid);
}
