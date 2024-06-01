package net.tamasnovak.domains.application.studentApplication.service;

import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.accountRole.mentor.model.entity.Mentor;
import net.tamasnovak.domains.accountRole.student.models.entity.Student;
import net.tamasnovak.domains.accountRole.student.service.StudentService;
import net.tamasnovak.domains.application.application.service.ApplicationService;
import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;
import net.tamasnovak.domains.application.shared.models.entity.Application;
import net.tamasnovak.domains.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.domains.application.shared.persistence.ApplicationView;
import net.tamasnovak.domains.application.studentApplication.models.dtoRequests.NewApplicationByStudentDto;
import net.tamasnovak.domains.application.studentApplication.models.dtoRequests.UpdateApplicationByStudentDto;
import net.tamasnovak.domains.application.studentApplication.models.dtoResponses.StudentDashboardDataDto;
import net.tamasnovak.domains.applicationStages.applicationStatus.models.entity.ApplicationStatus;
import net.tamasnovak.domains.applicationStages.applicationStatus.service.ApplicationStatusService;
import net.tamasnovak.domains.applicationStages.finalDestinationStatus.models.entity.FinalDestinationStatus;
import net.tamasnovak.domains.applicationStages.finalDestinationStatus.service.FinalDestinationStatusService;
import net.tamasnovak.domains.applicationStages.interviewStatus.service.InterviewStatusService;
import net.tamasnovak.domains.applicationStages.offerStatus.service.OfferStatusService;
import net.tamasnovak.domains.applicationStages.responseStatus.models.entity.ResponseStatus;
import net.tamasnovak.domains.applicationStages.responseStatus.service.ResponseStatusService;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import net.tamasnovak.domains.support.country.models.entity.Country;
import net.tamasnovak.domains.support.country.service.CountryService;
import net.tamasnovak.domains.support.university.models.entity.University;
import net.tamasnovak.domains.support.university.service.UniversityService;
import net.tamasnovak.validation.applicationFieldValidator.ExistingApplicationValidator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StudentApplicationServiceImplTest {
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
  ExistingApplicationValidator existingApplicationValidator;

  @Mock
  StudentApplicationConstants studentApplicationConstants;

  @Mock
  GlobalServiceConstants globalServiceConstants;

  @InjectMocks
  StudentApplicationServiceImpl underTest;

  private final Account mockAccount = mock(Account.class);
  private final Student mockStudent = mock(Student.class);
  private final UUID applicationUuid = UUID.randomUUID();
  private final Application mockApplication = mock(Application.class);

  @Nested
  @DisplayName("getAllApplicationDtosByAccount() unit tests")
  class GetAllApplicationViewsByStudentUnitTests {
    @Test
    @Description("Returns a list of ApplicationDto instances.")
    void shouldReturnApplicationViews() {
      List<ApplicationView> mockApplicationViews = Arrays.asList(mock(ApplicationView.class), mock(ApplicationView.class));
      ApplicationDto mockApplicationDto1 = new ApplicationDto(mockApplicationViews.get(0));
      ApplicationDto mockApplicationDto2 = new ApplicationDto(mockApplicationViews.get(1));

      List<ApplicationDto> expected = Arrays.asList(mockApplicationDto1, mockApplicationDto2);

      when(studentService.getByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationRepository.findApplicationViewsByStudentId(mockStudent.getId())).thenReturn(mockApplicationViews);

      List<ApplicationDto> actual = underTest.getAllApplicationDtosByAccount(mockAccount);

      assertEquals(expected, actual);

      verify(studentService, times(1)).getByAccount(mockAccount);
      verify(applicationRepository, times(1)).findApplicationViewsByStudentId(mockStudent.getId());
    }
  }

  @Nested
  @DisplayName("toggleIsRemovableByApplicationUuid() unit tests")
  class ToggleIsRemovableByApplicationUuidUnitTests {
    @Test
    @Description("is_removable field is successfully updated.")
    void shouldSuccessfullyUpdateIsRemovableField() {
      applicationRepository.updateIsRemovableFieldByUuid(applicationUuid);

      verify(applicationRepository, times(1)).updateIsRemovableFieldByUuid(applicationUuid);
    }

    @Test
    @Description("Throws IllegalArgumentException if UUID string is invalid.")
    void shouldThrowIllegalArgumentException_IfUuidStringIsInvalid() {
      assertThrows(IllegalArgumentException.class, () -> underTest.toggleIsRemovableByApplicationUuid("invalidUuid"));
    }

    @Test
    @Description("Throws NullPointerException if UUID string is null.")
    void shouldThrowNullPointerException_IfUuidStringIsNull() {
      assertThrows(NullPointerException.class, () -> underTest.toggleIsRemovableByApplicationUuid(null));
    }
  }

  @Nested
  @DisplayName("getAggregateDataByAccount() unit tests")
  class getAggregateDataByAccountUnitTests {
    @Test
    @Description("Returns a DashboardAggregateDataDto instance.")
    void shouldReturnDashboardAggregateDataDto() {
      when(studentService.getByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationStatusService.getByName(anyString())).thenReturn(mock(ApplicationStatus.class));
      when(applicationStatusService.getByName(anyString())).thenReturn(mock(ApplicationStatus.class));
      when(applicationStatusService.getByName(anyString())).thenReturn(mock(ApplicationStatus.class));
      when(responseStatusService.getByName(anyString())).thenReturn(mock(ResponseStatus.class));
      when(finalDestinationStatusService.getByName(anyString())).thenReturn(mock(FinalDestinationStatus.class));

      StudentDashboardDataDto expected = new StudentDashboardDataDto(null, null, 0, 0, 0, 0, 0, 0, 0, 0);
      StudentDashboardDataDto actual = underTest.getAggregateDataByAccount(mockAccount);

      assertEquals(expected, actual);

      verify(studentService, times(1)).getByAccount(mockAccount);
      verify(applicationStatusService, times(3)).getByName(anyString());
      verify(responseStatusService, times(1)).getByName(anyString());
      verify(finalDestinationStatusService, times(2)).getByName(anyString());
    }
  }

  @Nested
  @DisplayName("create() unit tests")
  class CreateUnitTests {
    @Test
    @Description("Creates an Application record and returns its ApplicationView projection.")
    void shouldCreateApplication_AndReturnApplicationView() {
      Country mockCountry = mock(Country.class);
      University mockUniversity = mock(University.class);
      ApplicationStatus mockApplicationStatus = mock(ApplicationStatus.class);

      NewApplicationByStudentDto requestBody = mock(NewApplicationByStudentDto.class);

      ApplicationDto expected = mock(ApplicationDto.class);

      when(countryService.getByUuid(requestBody.countryUuid())).thenReturn(mockCountry);
      when(universityService.getByUuid(requestBody.universityUuid())).thenReturn(mockUniversity);
      when(studentService.getByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationStatusService.getByName("Planned")).thenReturn(mockApplicationStatus);

      when(applicationRepository.save(any(Application.class))).thenReturn(mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.getApplicationDtoByUuid(applicationUuid.toString())).thenReturn(expected);

      ApplicationDto actual = underTest.create(mockAccount, requestBody);

      assertEquals(expected, actual);

      verify(countryService, times(1)).getByUuid(requestBody.countryUuid());
      verify(universityService, times(1)).getByUuid(requestBody.universityUuid());
      verify(studentService, times(1)).getByAccount(mockAccount);
      verify(applicationStatusService, times(1)).getByName("Planned");
      verify(applicationService, times(1)).getApplicationDtoByUuid(applicationUuid.toString());
    }
  }

  @Nested
  @DisplayName("updateByUuid() unit tests")
  class UpdateByUuidUnitTests {
    @Test
    @Description("Updates an Application record and returns ApplicationView projection.")
    void shouldUpdateApplication_AndReturnApplicationViewProjection() {
      UpdateApplicationByStudentDto requestBody = mock(UpdateApplicationByStudentDto.class);
      Mentor mockMentor = mock(Mentor.class);

      when(applicationService.getByUuid(applicationUuid.toString())).thenReturn(mockApplication);
      when(studentService.getByAccount(mockAccount)).thenReturn(Student.createStudent(mockAccount, mockMentor));

      ApplicationDto expected = mock(ApplicationDto.class);

      when(applicationRepository.save(any(Application.class))).thenReturn(mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.getApplicationDtoByUuid(applicationUuid.toString())).thenReturn(expected);

      ApplicationDto actual = underTest.updateAndRetrieveByUuid(applicationUuid.toString(), requestBody, mockAccount);

      assertEquals(expected, actual);

      verify(applicationService, times(1)).getByUuid(applicationUuid.toString());
      verify(applicationService, times(1)).getApplicationDtoByUuid(applicationUuid.toString());
    }
  }
}
