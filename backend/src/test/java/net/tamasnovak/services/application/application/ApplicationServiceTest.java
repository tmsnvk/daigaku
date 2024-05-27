package net.tamasnovak.services.application.application;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.application.response.applicationView.ApplicationView;
import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import net.tamasnovak.dtos.application.service.ApplicationIdsView;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.entities.support.institution.Institution;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import net.tamasnovak.utilities.mapper.ApplicationMapper;
import net.tamasnovak.utilities.validator.ValidatorUtilities;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ApplicationServiceTest {
  @Mock
  private AuthenticationFacade authenticationFacade;

  @Mock
  private ApplicationRepository applicationRepository;

  @Mock
  private GlobalServiceConstants globalServiceConstants;

  @Mock
  private ValidatorUtilities validatorUtilities;

  @Mock
  private ApplicationMapper applicationMapper;

  @InjectMocks
  private ApplicationService underTest;

  private final UUID applicationUuid = UUID.randomUUID();

  @Nested
  @DisplayName("getByUuid() unit tests")
  class GetByUuidUnitTests {
    @Test
    @Description("Returns the correct Application record.")
    void shouldReturnApplication() {
      Application expected = mock(Application.class);
      when(applicationRepository.findByUuid(applicationUuid)).thenReturn(Optional.of(expected));

      Application actual = underTest.getByUuid(applicationUuid.toString());

      assertEquals(expected, actual);

      verify(applicationRepository, times(1)).findByUuid(applicationUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if Application record is not found.")
    void shouldThrowEntityNotFoundException_IfApplicationIsNotFound() {
      when(applicationRepository.findByUuid(applicationUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getByUuid(applicationUuid.toString()));

      verify(applicationRepository, times(1)).findByUuid(applicationUuid);
    }

    @Test
    @Description("Throws IllegalArgumentException if UUID string is invalid.")
    void shouldThrowIllegalArgumentException_IfUuidStringIsInvalid() {
      assertThrows(IllegalArgumentException.class, () -> underTest.getByUuid("invalidUuid"));
    }

    @Test
    @Description("Throws NullPointerException if UUID string is null.")
    void shouldThrowNullPointerException_IfUuidStringIsNull() {
      assertThrows(NullPointerException.class, () -> underTest.getByUuid(null));
    }
  }

  @Nested
  @DisplayName("getMappedApplicationViewByUuid() unit tests")
  class GetMappedApplicationViewByUuidUnitTests {
    private final Institution mockInstitution = mock(Institution.class);
    private final Role mockRole = Role.createRole("ROLE_STUDENT");
    private final Account authAccount = Account.createAccount("Student", "Test User", "valid@email.net", "hashedPassword", mockInstitution, mockRole);

    @Test
    @Description("Returns the correct ApplicationView projection instance.")
    void shouldReturnApplicationViewProjection() {
      MappedApplicationView expected = mock(MappedApplicationView.class);
      ApplicationView mockApplicationView = mock(ApplicationView.class);

      when(applicationRepository.findApplicationViewByUuid(applicationUuid)).thenReturn(Optional.of(mockApplicationView));
      when(authenticationFacade.getAuthenticatedAccount()).thenReturn(authAccount);
      when(applicationRepository.findApplicationRelatedIdsByUuid(applicationUuid)).thenReturn(mock(ApplicationIdsView.class));

      when(applicationMapper.toMappedApplicationView(mockApplicationView)).thenReturn(expected);
      MappedApplicationView actual = underTest.getMappedApplicationViewByUuid(applicationUuid.toString());

      assertEquals(expected, actual);

      verify(applicationRepository, times(1)).findApplicationViewByUuid(applicationUuid);
      verify(authenticationFacade, times(1)).getAuthenticatedAccount();
      verify(applicationRepository, times(1)).findApplicationRelatedIdsByUuid(applicationUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if ApplicationView projection instance is not found.")
    void shouldThrowEntityNotFoundException_IfApplicationViewProjectionIsNotFound() {
      when(applicationRepository.findApplicationViewByUuid(applicationUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getMappedApplicationViewByUuid(applicationUuid.toString()));

      verify(applicationRepository, times(1)).findApplicationViewByUuid(applicationUuid);
    }

    @Test
    @Description("Throws IllegalArgumentException if UUID string is invalid.")
    void shouldThrowIllegalArgumentException_IfUuidStringIsInvalid() {
      assertThrows(IllegalArgumentException.class, () -> underTest.getMappedApplicationViewByUuid("invalidUuid"));
    }

    @Test
    @Description("Throws NullPointerException if UUID string is null.")
    void shouldThrowNullPointerException_IfUuidStringIsNull() {
      assertThrows(NullPointerException.class, () -> underTest.getMappedApplicationViewByUuid(null));
    }
  }
}
