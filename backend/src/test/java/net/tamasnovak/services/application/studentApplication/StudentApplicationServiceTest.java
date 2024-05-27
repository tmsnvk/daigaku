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
import net.tamasnovak.services.account.accountRole.AccountRoleService;
import net.tamasnovak.services.account.accountRole.student.StudentCoreService;
import net.tamasnovak.services.application.application.ApplicationCoreService;
import net.tamasnovak.services.status.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.status.finalDestinationStatus.FinalDestinationStatusService;
import net.tamasnovak.services.status.interviewStatus.InterviewStatusService;
import net.tamasnovak.services.status.offerStatus.OfferStatusService;
import net.tamasnovak.services.status.responseStatus.ResponseStatusService;
import net.tamasnovak.services.support.SupportCoreService;
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
class StudentApplicationServiceTest {
  @Mock
  AuthenticationFacade authenticationFacade;

  @Mock
  StudentCoreService studentCoreService;

  @Mock
  AccountRoleService<Student> studentAccountRoleService;

  @Mock(name = "CountryService")
  SupportCoreService<Country> countrySupportCoreService;

  @Mock(name = "UniversityService")
  SupportCoreService<University> universitySupportCoreService;

  @Mock
  ApplicationCoreService applicationCoreService;

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
  StudentApplicationService underTest;

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

      when(studentAccountRoleService.getAccountRoleByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationRepository.findApplicationViewsByStudentId(mockStudent.getId())).thenReturn(mockApplicationViews);

      when(applicationMapper.toMappedApplicationView(mockApplicationViews.get(0))).thenReturn(mockMappedApplicationView1);
      when(applicationMapper.toMappedApplicationView(mockApplicationViews.get(1))).thenReturn(mockMappedApplicationView2);

      List<MappedApplicationView> actual = underTest.getAllMappedApplicationViewsByStudent(mockAccount);

      assertEquals(expected, actual);

      verify(studentAccountRoleService, times(1)).getAccountRoleByAccount(mockAccount);
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
      when(studentAccountRoleService.getAccountRoleByAccount(mockAccount)).thenReturn(mockStudent);

      DashboardAggregateDataDto expected = new DashboardAggregateDataDto(null, null, 0, 0, 0, 0, 0, 0, 0, 0);
      DashboardAggregateDataDto actual = underTest.getAggregateDataDtoByStudent(mockAccount);

      assertEquals(expected, actual);

      verify(studentAccountRoleService, times(1)).getAccountRoleByAccount(mockAccount);
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

      MappedApplicationView expected = mock(MappedApplicationView.class);

      NewApplicationByStudentDto requestBody = mock(NewApplicationByStudentDto.class);
      when(requestBody.countryUuid()).thenReturn(UUID.randomUUID().toString());
      when(requestBody.universityUuid()).thenReturn(UUID.randomUUID().toString());

      when(countrySupportCoreService.getByUuid(requestBody.countryUuid())).thenReturn(mockCountry);
      when(universitySupportCoreService.getByUuid(requestBody.universityUuid())).thenReturn(mockUniversity);

      when(studentAccountRoleService.getAccountRoleByAccount(mockAccount)).thenReturn(mockStudent);
      when(applicationStatusService.getByName("Planned")).thenReturn(mockApplicationStatus);

      when(applicationRepository.save(any(Application.class))).thenReturn(mockApplication);

      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationCoreService.getMappedApplicationViewByUuid(applicationUuid.toString())).thenReturn(expected);


      MappedApplicationView actual = underTest.create(mockAccount, requestBody);

      assertEquals(expected, actual);

      verify(countrySupportCoreService, times(1)).getByUuid(requestBody.countryUuid());
      verify(universitySupportCoreService, times(1)).getByUuid(requestBody.universityUuid());
      verify(studentAccountRoleService, times(1)).getAccountRoleByAccount(mockAccount);
      verify(applicationStatusService, times(1)).getByName("Planned");
      verify(applicationRepository, times(1)).save(any(Application.class));
      verify(applicationCoreService, times(1)).getMappedApplicationViewByUuid(applicationUuid.toString());
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

      when(applicationCoreService.getByUuid(applicationUuid.toString())).thenReturn(mockApplication);
      when(authenticationFacade.getAuthenticatedAccount()).thenReturn(mockAccount);
      when(mockApplication.getStudent()).thenReturn(Student.createStudent(mockAccount, mockMentor));

      MappedApplicationView expected = mock(MappedApplicationView.class);

      when(applicationRepository.save(any(Application.class))).thenReturn(mockApplication);
      when(mockApplication.getUuid()).thenReturn(applicationUuid);
      when(applicationCoreService.getMappedApplicationViewByUuid(applicationUuid.toString())).thenReturn(expected);

      MappedApplicationView actual = underTest.updateByUuid(applicationUuid.toString(), requestBody);

      assertEquals(expected, actual);

      verify(applicationCoreService, times(1)).getByUuid(applicationUuid.toString());
      verify(authenticationFacade, times(1)).getAuthenticatedAccount();
      verify(applicationCoreService, times(1)).getMappedApplicationViewByUuid(applicationUuid.toString());
    }
  }
}
