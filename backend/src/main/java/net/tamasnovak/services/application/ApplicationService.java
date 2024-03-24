package net.tamasnovak.services.application;

import net.tamasnovak.dtos.application.DashboardDataDto;
import net.tamasnovak.dtos.application.NewApplicationDto;
import net.tamasnovak.dtos.application.NewSubmittedApplicationDto;
import net.tamasnovak.entities.account.Account;

import java.util.List;

public interface ApplicationService {
  List<NewApplicationDto> findAllByAccountAndRole(Account account);
  NewApplicationDto saveNewApplicationByStudent(Account account, NewSubmittedApplicationDto newSubmittedApplicationDto);
  DashboardDataDto getDashboardData(long accountId, String accountRole);
}
