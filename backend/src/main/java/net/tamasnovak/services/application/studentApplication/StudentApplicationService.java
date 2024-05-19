package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.dtos.application.response.ApplicationView;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.entities.account.baseAccount.Account;

import java.util.List;

public interface StudentApplicationService {
  List<ApplicationView> getAllApplicationsByStudent(Account account);
  ApplicationView createApplication(Account account, NewApplicationByStudentDto newApplicationByStudentDto);
  ApplicationView updateApplicationByUuid(String applicationUuid, UpdateApplicationByStudentDto updateApplicationByStudentDto);
  void updateIsRemovableByApplicationUuid(String uuid);
  DashboardAggregateDataDto getAggregateDataByAccount(Account account);
}
