package net.tamasnovak.artifact.application.studentApplication.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accountRole.mentor.entity.Mentor;
import net.tamasnovak.artifact.accountRole.student.entity.Student;
import net.tamasnovak.artifact.accountRole.student.service.StudentService;
import net.tamasnovak.artifact.application.application.service.ApplicationService;
import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationView;
import net.tamasnovak.artifact.application.studentApplication.dto.NewApplicationByStudent;
import net.tamasnovak.artifact.application.studentApplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.artifact.application.studentApplication.dto.StudentDashboardData;
import net.tamasnovak.artifact.applicationStages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationStages.applicationStatus.service.ApplicationStatusService;
import net.tamasnovak.artifact.applicationStages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationStages.finalDestinationStatus.service.FinalDestinationStatusService;
import net.tamasnovak.artifact.applicationStages.interviewStatus.service.InterviewStatusService;
import net.tamasnovak.artifact.applicationStages.offerStatus.service.OfferStatusService;
import net.tamasnovak.artifact.applicationStages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationStages.responseStatus.service.ResponseStatusService;
import net.tamasnovak.artifact.shared.constants.GlobalServiceConstants;
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

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

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
  StudentApplicationServiceConstants studentApplicationServiceConstants;

  @Mock
  GlobalServiceConstants globalServiceConstants;

  @InjectMocks
  StudentApplicationServiceImpl underTest;

  private final Account mockAccount = mock(Account.class);
  private final Student mockStudent = mock(Student.class);
  private final UUID applicationUuid = UUID.randomUUID();
  private final net.tamasnovak.artifact.application.shared.entity.Application mockApplication = mock(net.tamasnovak.artifact.application.shared.entity.Application.class);

  @Nested
  @DisplayName("getAllApplicationDtosByAccount() unit tests")
  class GetAllApplicationDataViewsByStudentUnitTests {
    @Test
    @Description("Returns a list of ApplicationDto instances.")
    void shouldReturnApplicationViews() {
      Instant now = Instant.now();

      List<ApplicationView> mockApplicationViews = Arrays.asList(mock(ApplicationView.class), mock(ApplicationView.class));
      ApplicationData mockApplicationData1 = new ApplicationData(null, null, null, null, null, null, 0, null, null, null, null, null, Timestamp.from(now), Timestamp.from(now), null, null, false);
      ApplicationData mockApplicationData2 = new ApplicationData(null, null, null, null, null, null, 0, null, null, null, null, null, Timestamp.from(now), Timestamp.from(now), null, null, false);
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
      applicationRepository.updateIsRemovableFieldByUuid(applicationUuid);

      verify(applicationRepository, times(1)).updateIsRemovableFieldByUuid(applicationUuid);
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
      when(studentService.getByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationStatusService.findByName(anyString())).thenReturn(mock(ApplicationStatus.class));
      when(applicationStatusService.findByName(anyString())).thenReturn(mock(ApplicationStatus.class));
      when(applicationStatusService.findByName(anyString())).thenReturn(mock(ApplicationStatus.class));
      when(responseStatusService.findByName(anyString())).thenReturn(mock(ResponseStatus.class));
      when(finalDestinationStatusService.findByName(anyString())).thenReturn(mock(FinalDestinationStatus.class));

      StudentDashboardData expected = new StudentDashboardData(null, null, 0, 0, 0, 0, 0, 0, 0, 0);
      StudentDashboardData actual = underTest.findStudentDashboardDataByAccount(mockAccount);

      assertEquals(expected, actual);

      verify(studentService, times(1)).getByAccount(mockAccount);
      verify(applicationStatusService, times(3)).findByName(anyString());
      verify(responseStatusService, times(1)).findByName(anyString());
      verify(finalDestinationStatusService, times(2)).findByName(anyString());
    }
  }

  @Nested
  @DisplayName("create() unit tests")
  class CreateUnitTests {
    Country mockCountry = mock(Country.class);
    University mockUniversity = mock(University.class);
    ApplicationStatus mockApplicationStatus = mock(ApplicationStatus.class);
    NewApplicationByStudent requestBody = mock(NewApplicationByStudent.class);

    @Test
    @Description("Creates an Application record and returns its ApplicationView projection.")
    void shouldCreateApplication_AndReturnApplicationView() {
      ApplicationData expected = mock(ApplicationData.class);

      when(countryService.findByUuid(UUID.fromString(requestBody.countryUuid()))).thenReturn(mockCountry);
      when(universityService.findByUuid(UUID.fromString(requestBody.universityUuid()))).thenReturn(mockUniversity);
      when(studentService.getByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationStatusService.findByName("Planned")).thenReturn(mockApplicationStatus);

      when(applicationRepository.save(any(net.tamasnovak.artifact.application.shared.entity.Application.class))).thenReturn(mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.fetchApplicationDataByUuid(applicationUuid)).thenReturn(expected);

      ApplicationData actual = underTest.createApplication(mockAccount, requestBody);

      assertEquals(expected, actual);

      verify(countryService, times(1)).findByUuid(UUID.fromString(requestBody.countryUuid()));
      verify(universityService, times(1)).findByUuid(UUID.fromString(requestBody.universityUuid()));
      verify(studentService, times(1)).getByAccount(mockAccount);
      verify(applicationStatusService, times(1)).findByName("Planned");
      verify(applicationService, times(1)).fetchApplicationDataByUuid(applicationUuid);
    }

    @Test
    @Description("Propagates exception when countryService throws EntityNotFoundException.")
    void shouldPropagateException_whenCountryServiceThrowsEntityNotFoundException() {
      when(countryService.findByUuid(UUID.fromString(requestBody.countryUuid()))).thenThrow(new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));

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
      UpdateApplicationByStudent requestBody = mock(UpdateApplicationByStudent.class);
      Mentor mockMentor = mock(Mentor.class);

      when(applicationService.findByUuid(applicationUuid)).thenReturn(mockApplication);
      when(studentService.getByAccount(mockAccount)).thenReturn(Student.createStudent(mockAccount, mockMentor));

      ApplicationData expected = mock(ApplicationData.class);

      when(applicationRepository.save(any(net.tamasnovak.artifact.application.shared.entity.Application.class))).thenReturn(mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.fetchApplicationDataByUuid(applicationUuid)).thenReturn(expected);

      ApplicationData actual = underTest.updateApplicationAndFetchByUuid(applicationUuid, requestBody, mockAccount);

      assertEquals(expected, actual);

      verify(applicationService, times(1)).findByUuid(applicationUuid);
      verify(applicationService, times(1)).fetchApplicationDataByUuid(applicationUuid);
    }
  }
}
