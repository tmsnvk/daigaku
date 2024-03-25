package net.tamasnovak.services.application;

import net.tamasnovak.dtos.application.DashboardDataDto;
import net.tamasnovak.dtos.application.NewApplicationDto;
import net.tamasnovak.dtos.application.NewSubmittedApplicationDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountsByRole.Student;

import java.util.List;

public interface ApplicationService {
  List<NewApplicationDto> findAllByStudentAccount(Student student);
  NewApplicationDto saveNewApplicationByStudent(Account account, NewSubmittedApplicationDto newSubmittedApplicationDto);
  DashboardDataDto getDashboardData(Account account, String accountRole);
}
