package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.DashboardDataDto;
import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.dtos.application.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.UpdateApplicationByStudentDto;
import net.tamasnovak.entities.account.Account;

import java.util.List;

public interface StudentApplicationService {
  List<ApplicationDto> findAllByAccount(Account studentAccount);
  ApplicationDto createApplication(Account studentAccount, NewApplicationByStudentDto newApplicationByStudentDto);
  ApplicationDto updateByUuid(Account account, String uuid, UpdateApplicationByStudentDto updateApplicationByStudentDto);
  DashboardDataDto getDashboardData(Account account, String accountRole);
}
