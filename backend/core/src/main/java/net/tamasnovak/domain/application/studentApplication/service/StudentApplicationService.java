package net.tamasnovak.domain.application.studentApplication.service;

import net.tamasnovak.domain.account.account.entity.Account;
import net.tamasnovak.domain.application.shared.dto.ApplicationData;
import net.tamasnovak.domain.application.studentApplication.dto.NewApplicationByStudent;
import net.tamasnovak.domain.application.studentApplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.domain.application.studentApplication.dto.StudentDashboardData;

import java.util.List;
import java.util.UUID;

public interface StudentApplicationService {
  List<ApplicationData> getAllApplicationResponsesByAccountUuid(UUID authAccountUuid);

  void toggleIsRemovableByApplicationUuid(UUID uuid);

  StudentDashboardData getAggregateDataByAccount(Account account);

  ApplicationData create(Account account, NewApplicationByStudent requestBody);

  ApplicationData updateAndRetrieveByUuid(UUID uuid, UpdateApplicationByStudent requestBody, Account account);

  void onApplicationDownloadRequest(UUID authAccountUuid);
}
