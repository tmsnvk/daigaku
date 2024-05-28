package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.dtos.application.response.applicationView.ApplicationView;
import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountByRole.Mentor;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.status.ApplicationStatus;
import net.tamasnovak.entities.support.country.Country;
import net.tamasnovak.entities.support.university.University;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.services.account.accountRole.student.StudentService;
import net.tamasnovak.services.application.application.ApplicationService;
import net.tamasnovak.services.status.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.status.finalDestinationStatus.FinalDestinationStatusService;
import net.tamasnovak.services.status.interviewStatus.InterviewStatusService;
import net.tamasnovak.services.status.offerStatus.OfferStatusService;
import net.tamasnovak.services.status.responseStatus.ResponseStatusService;
import net.tamasnovak.services.support.country.CountryService;
import net.tamasnovak.services.support.university.UniversityService;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import net.tamasnovak.utilities.mapper.ApplicationMapper;
import net.tamasnovak.utilities.validator.ValidatorUtilities;
import net.tamasnovak.utilities.validator.applicationFieldValidator.ApplicationFieldsValidator;
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
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StudentApplicationServiceImplImplTest {
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
  ApplicationFieldsValidator applicationFieldsValidator;

  @Mock
  ApplicationMapper applicationMapper;

  @Mock
  StudentApplicationServiceConstants studentApplicationConstants;

  @Mock
  GlobalServiceConstants globalServiceConstants;

  @InjectMocks
  StudentApplicationServiceImpl underTest;

  private final Account mockAccount = mock(Account.class);
  private final Student mockStudent = mock(Student.class);
  private final UUID applicationUuid = UUID.randomUUID();
  private final Application mockApplication = mock(Application.class);

  @Nested
  @DisplayName("getAllMappedApplicationViewsByStudent() unit tests")
  class GetAllMappedApplicationViewsByStudentUnitTests {
    @Test
    @Description("Returns a list of ApplicationView projection instances.")
    void shouldReturnApplicationViews() {
      List<ApplicationView> mockApplicationViews = Arrays.asList(mock(ApplicationView.class), mock(ApplicationView.class));
      MappedApplicationView mockMappedApplicationView1 = mock(MappedApplicationView.class);
      MappedApplicationView mockMappedApplicationView2 = mock(MappedApplicationView.class);

      List<MappedApplicationView> expected = Arrays.asList(mockMappedApplicationView1, mockMappedApplicationView2);

      when(studentService.getAccountRoleByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationRepository.findApplicationViewsByStudentId(mockStudent.getId())).thenReturn(mockApplicationViews);

      when(applicationMapper.toMappedApplicationView(mockApplicationViews.get(0))).thenReturn(mockMappedApplicationView1);
      when(applicationMapper.toMappedApplicationView(mockApplicationViews.get(1))).thenReturn(mockMappedApplicationView2);

      List<MappedApplicationView> actual = underTest.getAllMappedApplicationViewsByStudent(mockAccount);

      assertEquals(expected, actual);

      verify(studentService, times(1)).getAccountRoleByAccount(mockAccount);
      verify(applicationRepository, times(1)).findApplicationViewsByStudentId(mockStudent.getId());
      verify(applicationMapper, times(1)).toMappedApplicationView(mockApplicationViews.get(0));
      verify(applicationMapper, times(1)).toMappedApplicationView(mockApplicationViews.get(1));
    }
  }

  @Nested
  @DisplayName("toggleIsRemovableFieldByApplicationUuid() unit tests")
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
      assertThrows(IllegalArgumentException.class, () -> underTest.toggleIsRemovableFieldByApplicationUuid("invalidUuid"));
    }

    @Test
    @Description("Throws NullPointerException if UUID string is null.")
    void shouldThrowNullPointerException_IfUuidStringIsNull() {
      assertThrows(NullPointerException.class, () -> underTest.toggleIsRemovableFieldByApplicationUuid(null));
    }
  }

  @Nested
  @DisplayName("getAggregateDataByAccount() unit tests")
  class getAggregateDataByAccountUnitTests {
    @Test
    @Description("Returns a DashboardAggregateDataDto instance.")
    void shouldReturnDashboardAggregateDataDto() {
      when(studentService.getAccountRoleByAccount(mockAccount)).thenReturn(mockStudent);

      DashboardAggregateDataDto expected = new DashboardAggregateDataDto(null, null, 0, 0, 0, 0, 0, 0, 0, 0);
      DashboardAggregateDataDto actual = underTest.getAggregateDataDtoByStudent(mockAccount);

      assertEquals(expected, actual);

      verify(studentService, times(1)).getAccountRoleByAccount(mockAccount);
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

      MappedApplicationView expected = mock(MappedApplicationView.class);

      when(countryService.getByUuid(requestBody.countryUuid())).thenReturn(mockCountry);
      when(universityService.getByUuid(requestBody.universityUuid())).thenReturn(mockUniversity);
      when(studentService.getAccountRoleByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationStatusService.getByName("Planned")).thenReturn(mockApplicationStatus);

      when(applicationRepository.save(any(Application.class))).thenReturn(mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.getMappedApplicationViewByUuid(applicationUuid.toString())).thenReturn(expected);

      MappedApplicationView actual = underTest.create(mockAccount, requestBody);

      assertEquals(expected, actual);

      verify(countryService, times(1)).getByUuid(requestBody.countryUuid());
      verify(universityService, times(1)).getByUuid(requestBody.universityUuid());
      verify(studentService, times(1)).getAccountRoleByAccount(mockAccount);
      verify(applicationStatusService, times(1)).getByName("Planned");
      verify(applicationService, times(1)).getMappedApplicationViewByUuid(applicationUuid.toString());
    }
  }

  @Nested
  @DisplayName("updateApplicationByUuid() unit tests")
  class UpdateApplicationByUuidUnitTests {
    @Test
    @Description("Updates an Application record and returns ApplicationView projection.")
    void shouldUpdateApplication_AndReturnApplicationViewProjection() {
      UpdateApplicationByStudentDto requestBody = mock(UpdateApplicationByStudentDto.class);
      Mentor mockMentor = mock(Mentor.class);

      when(applicationService.getByUuid(applicationUuid.toString())).thenReturn(mockApplication);
      when(authenticationFacade.getAuthenticatedAccount()).thenReturn(mockAccount);
      when(mockApplication.getStudent()).thenReturn(Student.createStudent(mockAccount, mockMentor));

      MappedApplicationView expected = mock(MappedApplicationView.class);

      when(applicationRepository.save(any(Application.class))).thenReturn(mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationService.getMappedApplicationViewByUuid(applicationUuid.toString())).thenReturn(expected);

      MappedApplicationView actual = underTest.updateByUuid(applicationUuid.toString(), requestBody);

      assertEquals(expected, actual);

      verify(applicationService, times(1)).getByUuid(applicationUuid.toString());
      verify(authenticationFacade, times(1)).getAuthenticatedAccount();
      verify(applicationService, times(1)).getMappedApplicationViewByUuid(applicationUuid.toString());
    }
  }
}
