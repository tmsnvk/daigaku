package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.DashboardDataDto;
import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.dtos.application.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.UpdateApplicationByStudentDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountsByRole.Student;

import java.util.List;
import java.util.UUID;

public interface StudentApplicationService {
  List<ApplicationDto> findAllByAccount(Student student);
  ApplicationDto createApplication(Student student, NewApplicationByStudentDto newApplicationByStudentDto);
  ApplicationDto updateByUuid(UUID uuid, UpdateApplicationByStudentDto updateApplicationByStudentDto);
  DashboardDataDto getDashboardData(Account account, String accountRole);
}
