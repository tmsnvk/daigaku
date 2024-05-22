package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.dtos.application.response.ApplicationView;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.entities.account.accountByRole.Mentor;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.services.account.accountByRole.student.StudentService;
import net.tamasnovak.services.application.application.ApplicationService;
import net.tamasnovak.services.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.finalDestinationStatus.FinalDestinationStatusService;
import net.tamasnovak.services.interviewStatus.InterviewStatusService;
import net.tamasnovak.services.offerStatus.OfferStatusService;
import net.tamasnovak.services.responseStatus.ResponseStatusService;
import net.tamasnovak.services.university.UniversityService;
import net.tamasnovak.utilities.ValidatorUtilities;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StudentApplicationServiceImplTest {
  @Mock
  AuthenticationFacade authenticationFacade;
  @Mock
  StudentService studentService;
  @Mock
  CountryService countryService;
  @Mock
  UniversityService universityService;
  @Mock
  ApplicationService applicationService;
  @Mock
  ApplicationStatusService applicationStatusService;
  @Mock
  InterviewStatusService interviewStatusService;
  @Mock
  OfferStatusService offerStatusService;
  @Mock
  ResponseStatusService responseStatusService;
  @Mock
  FinalDestinationStatusService finalDestinationStatusService;
  @Mock
  ApplicationRepository applicationRepository;
  @Mock
  ValidatorUtilities validatorUtilities;
  @Mock
  StudentApplicationConstants studentApplicationConstants;
  @Mock
  GlobalServiceConstants globalServiceConstants;
  @InjectMocks
  StudentApplicationServiceImpl underTest;

  private final Account mockAccount = mock(Account.class);
  private final Student mockStudent = mock(Student.class);
  private final Application mockApplication = mock(Application.class);
  private final UUID applicationUuid = UUID.randomUUID();

  @Nested
  @DisplayName("getAllApplicationsByStudent() unit tests")
  class GetAllApplicationViewsByStudentUnitTests {
    @Test
    @Description("Returns a list of ApplicationView projection instances.")
    public void shouldReturnApplicationViews() {
      List<ApplicationView> mockApplicationViews = Collections.singletonList(mock(ApplicationView.class));

      when(studentService.getStudentByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationRepository.findApplicationViewsByStudentId(mockStudent.getId())).thenReturn(mockApplicationViews);

      List<ApplicationView> actual = underTest.getAllApplicationViewsByStudent(mockAccount);

      verify(studentService, times(1)).getStudentByAccount(mockAccount);
      verify(applicationRepository, times(1)).findApplicationViewsByStudentId(mockStudent.getId());

      assertEquals(mockApplicationViews, actual);
    }
  }

  @Nested
  @DisplayName("createApplication() unit tests")
  class CreateApplicationUnitTests {
    @Test
    @Description("Creates an Application record and returns its ApplicationView projection.")
    public void shouldCreateApplication_AndReturnApplicationView() {
      Country mockCountry = mock(Country.class);
      University mockUniversity = mock(University.class);
      ApplicationStatus mockApplicationStatus = mock(ApplicationStatus.class);

      NewApplicationByStudentDto requestBody = mock(NewApplicationByStudentDto.class);

      ApplicationView expected = mock(ApplicationView.class);

      when(countryService.getCountryByUuid(requestBody.countryUuid())).thenReturn(mockCountry);
      when(universityService.getUniversityByUuid(requestBody.universityUuid())).thenReturn(mockUniversity);
      when(studentService.getStudentByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationStatusService.getStatusByName("Planned")).thenReturn(mockApplicationStatus);

      when(applicationRepository.save(any(Application.class))).thenReturn(mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.getApplicationViewByUuid(applicationUuid.toString())).thenReturn(expected);

      ApplicationView actual = underTest.createApplication(mockAccount, requestBody);

      verify(countryService, times(1)).getCountryByUuid(requestBody.countryUuid());
      verify(universityService, times(1)).getUniversityByUuid(requestBody.universityUuid());
      verify(studentService, times(1)).getStudentByAccount(mockAccount);
      verify(applicationStatusService, times(1)).getStatusByName("Planned");
      verify(applicationService, times(1)).getApplicationViewByUuid(applicationUuid.toString());

      assertEquals(expected, actual);
    }
  }

  @Nested
  @DisplayName("updateApplicationByUuid() unit tests")
  class UpdateApplicationByUuidUnitTests {
    @Test
    @Description("Updates an Application record and returns ApplicationView projection.")
    public void shouldUpdateApplication_AndReturnApplicationViewProjection() {
      UpdateApplicationByStudentDto requestBody = mock(UpdateApplicationByStudentDto.class);
      Mentor mockMentor = mock(Mentor.class);

      when(applicationService.getApplicationByUuid(applicationUuid.toString())).thenReturn(mockApplication);
      when(authenticationFacade.getAuthenticatedAccount()).thenReturn(mockAccount);
      when(mockApplication.getStudent()).thenReturn(Student.createStudent(mockAccount, mockMentor));

      ApplicationView expected = mock(ApplicationView.class);

      when(applicationRepository.save(any(Application.class))).thenReturn(mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.getApplicationViewByUuid(applicationUuid.toString())).thenReturn(expected);

      ApplicationView actual = underTest.updateApplicationByUuid(applicationUuid.toString(), requestBody);

      verify(applicationService, times(1)).getApplicationByUuid(applicationUuid.toString());
      verify(authenticationFacade, times(1)).getAuthenticatedAccount();

      assertEquals(expected, actual);
    }
  }

  @Nested
  @DisplayName("updateIsRemovableByApplicationUuid() unit tests")
  class UpdateIsRemovableByApplicationUuidUnitTests {
    @Test
    @Description("is_removable field successfully updated.")
    public void shouldSuccessfullyUpdateIsRemovableField() {
      applicationRepository.updateIsRemovableByUuid(applicationUuid);

      verify(applicationRepository, times(1)).updateIsRemovableByUuid(applicationUuid);
    }
  }

  @Nested
  @DisplayName("getAggregateDataByAccount() unit tests")
  class getAggregateDataByAccountUnitTests {
    @Test
    @Description("Returns DashboardAggregateDataDto instance.")
    public void shouldReturnDashboardAggregateDataDto() {
      when(studentService.getStudentByAccount(mockAccount)).thenReturn(mockStudent);

      DashboardAggregateDataDto expected = new DashboardAggregateDataDto(null, null, 0, 0, 0, 0, 0, 0, 0, 0);
      DashboardAggregateDataDto actual = underTest.getAggregateDataByAccount(mockAccount);

      verify(studentService, times(1)).getStudentByAccount(mockAccount);

      assertEquals(expected, actual);
    }
  }
}
