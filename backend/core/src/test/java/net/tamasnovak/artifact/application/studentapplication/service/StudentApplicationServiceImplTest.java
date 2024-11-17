package net.tamasnovak.artifact.application.studentapplication.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.mentor.entity.Mentor;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.accounttype.student.service.StudentService;
import net.tamasnovak.artifact.application.application.service.ApplicationService;
import net.tamasnovak.artifact.application.common.dto.ApplicationData;
import net.tamasnovak.artifact.application.common.persistence.ApplicationRepository;
import net.tamasnovak.artifact.application.common.persistence.ApplicationView;
import net.tamasnovak.artifact.application.studentapplication.dto.NewApplicationByStudentRequest;
import net.tamasnovak.artifact.application.studentapplication.dto.StudentDashboardDetails;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudentRequest;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.service.ApplicationStatusService;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.service.FinalDestinationStatusService;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.service.InterviewStatusService;
import net.tamasnovak.artifact.applicationstatus.offerstatus.service.OfferStatusService;
import net.tamasnovak.artifact.applicationstatus.responsestatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstatus.responsestatus.service.ResponseStatusService;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.country.service.CountryService;
import net.tamasnovak.artifact.support.university.entity.University;
import net.tamasnovak.artifact.support.university.service.UniversityService;
import net.tamasnovak.validation.applicationfieldvalidator.ExistingApplicationValidator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
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
  StudentApplicationServiceMessages studentApplicationServiceMessages;

  @Mock
  GlobalServiceMessages globalServiceMessages;

  @InjectMocks
  StudentApplicationServiceImpl underTest;

  private final Account mockAccount = mock(Account.class);
  private final Student mockStudent = mock(Student.class);
  private final UUID applicationUuid = UUID.randomUUID();
  private final net.tamasnovak.artifact.application.common.entity.Application mockApplication = mock(
    net.tamasnovak.artifact.application.common.entity.Application.class);

  @Nested
  @DisplayName("getAllApplicationDtosByAccount() unit tests")
  class GetAllApplicationDataViewsByStudentUnitTests {
    @Test
    @Description("Returns a list of ApplicationDto instances.")
    void shouldReturnApplicationViews() {
      Instant now = Instant.now();

      List<ApplicationView> mockApplicationViews = Arrays.asList(mock(ApplicationView.class), mock(ApplicationView.class));
      ApplicationData mockApplicationData1 = new ApplicationData(null, null, null, null, null, null, 0, null, null, null, null, null,
        Timestamp.from(now), Timestamp.from(now), null, null, false);
      ApplicationData mockApplicationData2 = new ApplicationData(null, null, null, null, null, null, 0, null, null, null, null, null,
        Timestamp.from(now), Timestamp.from(now), null, null, false);
      when(mockApplicationViews.get(0).getCreatedAt()).thenReturn(now);
      when(mockApplicationViews.get(0).getLastUpdatedAt()).thenReturn(now);
      when(mockApplicationViews.get(1).getCreatedAt()).thenReturn(now);
      when(mockApplicationViews.get(1).getLastUpdatedAt()).thenReturn(now);

      List<ApplicationData> expected = Arrays.asList(mockApplicationData1, mockApplicationData2);

      when(applicationRepository.findApplicationViewsByAccountUuid(mockAccount.getUuid())).thenReturn(mockApplicationViews);

      List<ApplicationData> actual = underTest.findApplicationDataByAccountUuid(mockAccount.getUuid());

      assertEquals(expected, actual);

      verify(applicationRepository, times(1)).findApplicationViewsByAccountUuid(mockAccount.getUuid());
    }
  }

  @Nested
  @DisplayName("toggleIsRemovableByApplicationUuid() unit tests")
  class ToggleIsRemovableByApplicationDataUuidUnitTests {
    @Test
    @Description("is_removable field is successfully updated.")
    void shouldSuccessfullyUpdateIsRemovableField() {
      applicationRepository.toggleIsRemovableByApplicationUuid(applicationUuid);

      verify(applicationRepository, times(1)).toggleIsRemovableByApplicationUuid(applicationUuid);
    }

    @Test
    @Description("Throws IllegalArgumentException if UUID string is invalid.")
    void shouldThrowIllegalArgumentException_IfUuidStringIsInvalid() {
      assertThrows(IllegalArgumentException.class, () -> underTest.toggleIsRemovableByApplicationUuid(null, null));
    }

    @Test
    @Description("Throws NullPointerException if UUID string is null.")
    void shouldThrowNullPointerException_IfUuidStringIsNull() {
      assertThrows(NullPointerException.class, () -> underTest.toggleIsRemovableByApplicationUuid(null, null));
    }
  }

  @Nested
  @DisplayName("getAggregateDataByAccount() unit tests")
  class getAggregateDataByAccountUnitTests {
    @Test
    @Description("Returns a DashboardAggregateDataDto instance.")
    void shouldReturnDashboardAggregateDataDto() {
      when(studentService.findStudentByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationStatusService.findStatusByName(anyString())).thenReturn(mock(ApplicationStatus.class));
      when(applicationStatusService.findStatusByName(anyString())).thenReturn(mock(ApplicationStatus.class));
      when(applicationStatusService.findStatusByName(anyString())).thenReturn(mock(ApplicationStatus.class));
      when(responseStatusService.findStatusByName(anyString())).thenReturn(mock(ResponseStatus.class));
      when(finalDestinationStatusService.findStatusByName(anyString())).thenReturn(mock(FinalDestinationStatus.class));

      StudentDashboardDetails expected = new StudentDashboardDetails(null, null, 0, 0, 0, 0, 0, 0, 0, 0);
      StudentDashboardDetails actual = underTest.findStudentDashboardDataByAccount(mockAccount);

      assertEquals(expected, actual);

      verify(studentService, times(1)).findStudentByAccount(mockAccount);
      verify(applicationStatusService, times(3)).findStatusByName(anyString());
      verify(responseStatusService, times(1)).findStatusByName(anyString());
      verify(finalDestinationStatusService, times(2)).findStatusByName(anyString());
    }
  }

  @Nested
  @DisplayName("create() unit tests")
  class CreateUnitTests {
    Country mockCountry = mock(Country.class);
    University mockUniversity = mock(University.class);
    ApplicationStatus mockApplicationStatus = mock(ApplicationStatus.class);
    NewApplicationByStudentRequest requestBody = mock(NewApplicationByStudentRequest.class);

    @Test
    @Description("Creates an Application record and returns its ApplicationView projection.")
    void shouldCreateApplication_AndReturnApplicationView() {
      ApplicationData expected = mock(ApplicationData.class);

      when(countryService.findCountryByUuid(UUID.fromString(requestBody.countryUuid()))).thenReturn(mockCountry);
      when(universityService.findUniversityByUuid(UUID.fromString(requestBody.universityUuid()))).thenReturn(mockUniversity);
      when(studentService.findStudentByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationStatusService.findStatusByName("Planned")).thenReturn(mockApplicationStatus);

      when(applicationRepository.save(any(net.tamasnovak.artifact.application.common.entity.Application.class))).thenReturn(
        mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.createApplicationData(applicationUuid)).thenReturn(expected);

      ApplicationData actual = underTest.createApplication(mockAccount, requestBody);

      assertEquals(expected, actual);

      verify(countryService, times(1)).findCountryByUuid(UUID.fromString(requestBody.countryUuid()));
      verify(universityService, times(1)).findUniversityByUuid(UUID.fromString(requestBody.universityUuid()));
      verify(studentService, times(1)).findStudentByAccount(mockAccount);
      verify(applicationStatusService, times(1)).findStatusByName("Planned");
      verify(applicationService, times(1)).createApplicationData(applicationUuid);
    }

    @Test
    @Description("Propagates exception when countryService throws EntityNotFoundException.")
    void shouldPropagateException_whenCountryServiceThrowsEntityNotFoundException() {
      when(countryService.findCountryByUuid(UUID.fromString(requestBody.countryUuid()))).thenThrow(
        new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));

      assertThrows(EntityNotFoundException.class, () -> underTest.createApplication(mockAccount, requestBody));

      verify(applicationRepository, never()).save(mockApplication);
    }
  }

  @Nested
  @DisplayName("updateByUuid() unit tests")
  class UpdateByUuidUnitTests {
    @Test
    @Description("Updates an Application record and returns ApplicationView projection.")
    void shouldUpdateApplication_AndReturnApplicationViewProjection() {
      UpdateApplicationByStudentRequest requestBody = mock(UpdateApplicationByStudentRequest.class);
      Mentor mockMentor = mock(Mentor.class);

      when(applicationService.findApplicationByUuid(applicationUuid)).thenReturn(mockApplication);
      when(studentService.findStudentByAccount(mockAccount)).thenReturn(Student.createStudent(mockAccount, mockMentor));

      ApplicationData expected = mock(ApplicationData.class);

      when(applicationRepository.save(any(net.tamasnovak.artifact.application.common.entity.Application.class))).thenReturn(
        mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.createApplicationData(applicationUuid)).thenReturn(expected);

      ApplicationData actual = underTest.updateApplicationAndFetchByUuid(applicationUuid, requestBody, mockAccount);

      assertEquals(expected, actual);

      verify(applicationService, times(1)).findApplicationByUuid(applicationUuid);
      verify(applicationService, times(1)).createApplicationData(applicationUuid);
    }
  }
}
