package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.entities.account.baseAccount.Account;

import java.util.List;

public interface StudentApplicationService {
  List<ApplicationDto> getAllByStudent(Account account);
  ApplicationDto create(Account account, NewApplicationByStudentDto newApplicationByStudentDto);
  ApplicationDto updateByUuid(String applicationUuid, UpdateApplicationByStudentDto updateApplicationByStudentDto);
  void updateIsRemovableByUuid(String uuid);
  DashboardAggregateDataDto getAggregateData(Account account);
}
