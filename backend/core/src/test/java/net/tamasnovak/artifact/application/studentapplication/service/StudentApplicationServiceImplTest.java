/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.studentapplication.service;

import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.mentor.entity.Mentor;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.accounttype.student.service.StudentService;
import net.tamasnovak.artifact.application.application.service.ApplicationService;
import net.tamasnovak.artifact.application.common.dto.ApplicationData;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.application.common.persistence.ApplicationRepository;
import net.tamasnovak.artifact.application.common.persistence.ApplicationView;
import net.tamasnovak.artifact.application.studentapplication.dto.CreateApplicationByStudentPayload;
import net.tamasnovak.artifact.application.studentapplication.dto.StudentDashboardDetails;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudentPayload;
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
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
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

  @InjectMocks
  StudentApplicationServiceImpl underTest;

  private final Account mockAccount = mock(Account.class);
  private final Student mockStudent = mock(Student.class);
  private final UUID applicationUuid = UUID.randomUUID();
  private final UUID invalidUuid = UUID.fromString("1234-1234-1234-1234-1234");
  private final Application mockApplication = mock(Application.class);

  @Nested
  @DisplayName("findApplicationDataByAccountUuid() unit tests")
  class FindApplicationDataByAccountUuidUnitTests {
    @Test
    @Description("Returns a list of ApplicationData instances.")
    void shouldReturnApplicationDataList() {
      List<ApplicationView> mockApplicationViews = Arrays.asList(mock(ApplicationView.class), mock(ApplicationView.class));

      when(mockApplicationViews.get(0).getCreatedAt()).thenReturn(Instant.now());
      when(mockApplicationViews.get(0).getLastUpdatedAt()).thenReturn(Instant.now());
      when(mockApplicationViews.get(1).getCreatedAt()).thenReturn(Instant.now());
      when(mockApplicationViews.get(1).getLastUpdatedAt()).thenReturn(Instant.now());
      when(applicationRepository.findApplicationViewsByAccountUuid(mockAccount.getUuid())).thenReturn(mockApplicationViews);

      List<ApplicationData> actual = underTest.findApplicationDataByAccountUuid(mockAccount.getUuid());

      assertEquals(mockApplicationViews.size(), actual.size());
      assertTrue(actual.stream().allMatch((data) -> data instanceof ApplicationData));
      verify(applicationRepository, times(1)).findApplicationViewsByAccountUuid(mockAccount.getUuid());
    }

    @Test
    @Description("Returns an empty list when no ApplicationView instances are found as UUID string is invalid.")
    void shouldReturnEmptyList_IfUuidStringIsInvalid() {
      when(applicationRepository.findApplicationViewsByAccountUuid(mockAccount.getUuid())).thenReturn(Collections.emptyList());

      List<ApplicationData> actual = underTest.findApplicationDataByAccountUuid(mockAccount.getUuid());

      assertNotNull(actual);
      assertTrue(actual.isEmpty());
      verify(applicationRepository, times(1)).findApplicationViewsByAccountUuid(mockAccount.getUuid());
    }

    @Test
    @Description("Returns an empty list when no ApplicationView instances are found as UUID is null.")
    void shouldReturnEmptyList_IfUuidIsNull() {
      when(applicationRepository.findApplicationViewsByAccountUuid(null)).thenReturn(Collections.emptyList());

      List<ApplicationData> actual = underTest.findApplicationDataByAccountUuid(mockAccount.getUuid());

      assertNotNull(actual);
      assertTrue(actual.isEmpty());
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
  }

  @Nested
  @DisplayName("findStudentDashboardDataByAccount() unit tests")
  class FindStudentDashboardDataByAccountUnitTests {
    @Test
    @Description("Returns a StudentDashboardData instance.")
    void shouldReturnStudentDashboardData() {
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
  @DisplayName("createApplication() unit tests")
  class CreateApplicationUnitTests {
    Country mockCountry = mock(Country.class);
    University mockUniversity = mock(University.class);
    ApplicationStatus mockApplicationStatus = mock(ApplicationStatus.class);
    CreateApplicationByStudentPayload requestBody = mock(CreateApplicationByStudentPayload.class);

    @Test
    @Description("Creates an Application record and returns its ApplicationView projection.")
    void shouldCreateApplication_AndReturnApplicationView() {
      ApplicationData expected = mock(ApplicationData.class);
      UUID countryUuid = UUID.randomUUID();
      UUID universityUuid = UUID.randomUUID();

      when(requestBody.countryUuid()).thenReturn(countryUuid.toString());
      when(requestBody.universityUuid()).thenReturn(universityUuid.toString());
      when(requestBody.courseName()).thenReturn("Some Course");
      when(requestBody.minorSubject()).thenReturn("Some Minor");
      when(requestBody.programmeLength()).thenReturn(3);

      when(countryService.findCountryByUuid(countryUuid)).thenReturn(mockCountry);
      when(universityService.findUniversityByUuid(universityUuid)).thenReturn(mockUniversity);
      when(studentService.findStudentByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationStatusService.findStatusByName("Planned")).thenReturn(mockApplicationStatus);

      when(applicationRepository.save(any(Application.class))).thenReturn(mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.createApplicationData(applicationUuid)).thenReturn(expected);

      ApplicationData actual = underTest.createApplication(mockAccount, requestBody);

      assertEquals(expected, actual);
      verify(countryService, times(1)).findCountryByUuid(countryUuid);
      verify(universityService, times(1)).findUniversityByUuid(universityUuid);
      verify(studentService, times(1)).findStudentByAccount(mockAccount);
      verify(applicationStatusService, times(1)).findStatusByName("Planned");
      verify(applicationService, times(1)).createApplicationData(applicationUuid);
    }

    @Test
    @Description("Propagates exception when countryService throws EntityNotFoundException.")
    void shouldPropagateException_whenCountryServiceThrowsEntityNotFoundException() {
      UUID countryUuid = UUID.randomUUID();

      when(requestBody.countryUuid()).thenReturn(countryUuid.toString());
      when(countryService.findCountryByUuid(countryUuid)).thenThrow(new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));

      assertThrows(EntityNotFoundException.class, () -> underTest.createApplication(mockAccount, requestBody));
      verify(applicationRepository, never()).save(mockApplication);
    }

    @Test
    @Description("Propagates exception when universityService throws EntityNotFoundException.")
    void shouldPropagateException_whenUniversityServiceThrowsEntityNotFoundException() {
      UUID countryUuid = UUID.randomUUID();
      UUID universityUuid = UUID.randomUUID();

      when(requestBody.countryUuid()).thenReturn(countryUuid.toString());
      when(requestBody.universityUuid()).thenReturn(universityUuid.toString());
      when(countryService.findCountryByUuid(countryUuid)).thenReturn(mock(Country.class));
      when(universityService.findUniversityByUuid(universityUuid)).thenThrow(
        new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));

      assertThrows(EntityNotFoundException.class, () -> underTest.createApplication(mockAccount, requestBody));
      verify(applicationRepository, never()).save(mockApplication);
    }
  }

  @Nested
  @DisplayName("updateApplicationAndFetchByUuid() unit tests")
  class UpdateApplicationAndFetchByUuidUnitTests {
    @Test
    @Description("Updates an Application record and returns its ApplicationView projection.")
    void shouldUpdateApplication_AndReturnApplicationView() {
      UpdateApplicationByStudentPayload requestBody = mock(UpdateApplicationByStudentPayload.class);
      UUID applicationStatusUuid = UUID.randomUUID();
      UUID interviewStatusUuid = UUID.randomUUID();
      UUID offerStatusUuid = UUID.randomUUID();
      UUID responseStatusUuid = UUID.randomUUID();
      UUID finalDestinationStatusUuid = UUID.randomUUID();

      when(requestBody.applicationStatusUuid()).thenReturn(applicationStatusUuid.toString());
      when(requestBody.interviewStatusUuid()).thenReturn(interviewStatusUuid.toString());
      when(requestBody.offerStatusUuid()).thenReturn(offerStatusUuid.toString());
      when(requestBody.responseStatusUuid()).thenReturn(responseStatusUuid.toString());
      when(requestBody.finalDestinationStatusUuid()).thenReturn(finalDestinationStatusUuid.toString());

      Application mockApplication = mock(Application.class);
      when(applicationService.findApplicationByUuid(applicationUuid)).thenReturn(mockApplication);

      Mentor mockMentor = mock(Mentor.class);
      when(studentService.findStudentByAccount(mockAccount)).thenReturn(Student.createStudent(mockAccount, mockMentor));

      ApplicationData expected = mock(ApplicationData.class);

      when(applicationRepository.save(any(Application.class))).thenReturn(mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.createApplicationData(applicationUuid)).thenReturn(expected);

      ApplicationData actual = underTest.updateApplicationAndFetchByUuid(applicationUuid, requestBody, mockAccount);

      assertEquals(expected, actual);
      verify(applicationService, times(1)).findApplicationByUuid(applicationUuid);
      verify(applicationService, times(1)).createApplicationData(applicationUuid);
    }
  }
}
