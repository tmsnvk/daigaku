package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import net.tamasnovak.entities.account.Account;

import java.util.List;

public interface StudentApplicationService {
  List<MappedApplicationView> getAllMappedApplicationViewsByStudent(Account account);

  void toggleIsRemovableFieldByApplicationUuid(String uuid);

  DashboardAggregateDataDto getAggregateDataDtoByStudent(Account account);

  MappedApplicationView create(Account account, NewApplicationByStudentDto requestBody);

  MappedApplicationView updateByUuid(String applicationUuid, UpdateApplicationByStudentDto requestBody);
}
