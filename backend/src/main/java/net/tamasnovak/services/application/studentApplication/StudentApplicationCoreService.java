package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import net.tamasnovak.entities.account.baseAccount.Account;

import java.util.List;

public interface StudentApplicationCoreService {
  List<MappedApplicationView> getAllMappedApplicationViewsByStudent(Account account);
  void toggleIsRemovableFieldByApplicationUuid(String uuid);
  DashboardAggregateDataDto getAggregateDataDtoByStudent(Account account);
}
