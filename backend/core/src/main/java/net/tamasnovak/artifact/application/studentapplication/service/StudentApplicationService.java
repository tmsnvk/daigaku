package net.tamasnovak.artifact.application.studentapplication.service;

import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
import net.tamasnovak.artifact.application.studentapplication.dto.NewApplicationByStudent;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.artifact.application.studentapplication.dto.StudentDashboardData;

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
