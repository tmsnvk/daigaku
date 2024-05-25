package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import net.tamasnovak.entities.account.baseAccount.Account;

import java.util.List;

public interface StudentApplicationService {
  List<MappedApplicationView> getAllMappedApplicationViewsByStudent(Account account);
  MappedApplicationView createApplication(Account account, NewApplicationByStudentDto newApplicationByStudentDto);
  MappedApplicationView updateApplicationByUuid(String applicationUuid, UpdateApplicationByStudentDto updateApplicationByStudentDto);
  void toggleIsRemovableFieldByApplicationUuid(String uuid);
  DashboardAggregateDataDto getAggregateDataDtoByStudent(Account account);
}
