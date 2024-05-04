package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.entities.account.baseAccount.Account;

import java.util.List;

public interface StudentApplicationService {
  List<ApplicationDto> findAllByAccount(Account account);
  ApplicationDto createApplication(Account account, NewApplicationByStudentDto newApplicationByStudentDto);
  ApplicationDto updateByUuid(Account account, String uuid, UpdateApplicationByStudentDto updateApplicationByStudentDto);
  void markForDeletionByUuid(String uuid);
  DashboardAggregateDataDto getDashboardData(Account account);
}
