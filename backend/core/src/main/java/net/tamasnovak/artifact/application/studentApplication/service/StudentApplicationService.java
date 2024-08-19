package net.tamasnovak.artifact.application.studentApplication.service;

import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
import net.tamasnovak.artifact.application.studentApplication.dto.NewApplicationByStudent;
import net.tamasnovak.artifact.application.studentApplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.artifact.application.studentApplication.dto.StudentDashboardData;

import java.util.List;
import java.util.UUID;

public interface StudentApplicationService {
  List<ApplicationData> findApplicationDataByAccountUuid(UUID accountUuid);

  void toggleIsRemovableByApplicationUuid(UUID applicationUuid, UUID accountUuid);

  StudentDashboardData findStudentDashboardDataByAccount(Account account);

  ApplicationData createApplication(Account account, NewApplicationByStudent requestBody);

  ApplicationData updateApplicationAndFetchByUuid(UUID uuid, UpdateApplicationByStudent requestBody, Account account);

  void handleDownloadRequest(UUID accountUuid);
}
