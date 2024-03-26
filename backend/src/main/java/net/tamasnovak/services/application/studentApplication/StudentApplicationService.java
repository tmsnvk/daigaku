package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.DashboardDataDto;
import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.dtos.application.NewApplicationByStudentDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountsByRole.Student;

import java.util.List;

public interface StudentApplicationService {
  List<ApplicationDto> findAllByAccount(Student student);
  ApplicationDto createApplication(Student student, NewApplicationByStudentDto newApplicationByStudentDto);
  DashboardDataDto getDashboardData(Account account, String accountRole);
}
