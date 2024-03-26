package net.tamasnovak.controllers.application;

import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.dtos.application.DashboardDataDto;
import net.tamasnovak.dtos.application.NewApplicationByStudentDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountsByRole.Student;
import net.tamasnovak.services.account.accountsStudentsJunction.AccountsStudentsJunctionService;
import net.tamasnovak.services.application.studentApplication.StudentApplicationService;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/applications/students")
public final class StudentApplicationController {
  private final StudentApplicationService studentApplicationService;
  private final AccountsStudentsJunctionService accountsStudentsJunctionService;
  private final AuthenticationFacade authenticationFacade;

  @Autowired
  public StudentApplicationController(StudentApplicationService studentApplicationService, AccountsStudentsJunctionService accountsStudentsJunctionService, AuthenticationFacade authenticationFacade) {
    this.studentApplicationService = studentApplicationService;
    this.accountsStudentsJunctionService = accountsStudentsJunctionService;
    this.authenticationFacade = authenticationFacade;
  }

  @RequestMapping(
    value = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<List<ApplicationDto>> getAllByAccount() {
    Account account = authenticationFacade.getAuthenticatedAccount();
    Student student = accountsStudentsJunctionService.findStudentByAccount(account);

    List<ApplicationDto> applications = studentApplicationService.findAllByAccount(student);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(applications);
  }

  @RequestMapping(
    value = "",
    method = RequestMethod.POST,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<ApplicationDto> createApplication(@RequestBody NewApplicationByStudentDto newApplicationByStudentDto) {
    Account account = authenticationFacade.getAuthenticatedAccount();
    Student student = accountsStudentsJunctionService.findStudentByAccount(account);

    ApplicationDto newApplication = studentApplicationService.createApplication(student, newApplicationByStudentDto);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(newApplication);
  }

  @RequestMapping(
    value = "/dashboard-data",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<DashboardDataDto> getDashboardData() {
    Account account = authenticationFacade.getAuthenticatedAccount();
    String accountRole = authenticationFacade.getAuthenticatedAccountRole();

    DashboardDataDto dashboardDataDto = studentApplicationService.getDashboardData(account, accountRole);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(dashboardDataDto);
  }
}
