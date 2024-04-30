package net.tamasnovak.services.account.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.entities.account.baseAccount.PendingAccount;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.repositories.account.PendingAccountRepository;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.institution.InstitutionService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.UUID;

@ExtendWith(MockitoExtension.class)
class PendingAccountServiceImplTest {
  @Mock
  private AccountService accountService;
  @Mock
  private InstitutionService institutionService;
  @Mock
  private EmailService emailService;
  @Mock
  private PendingAccountRepository pendingAccountRepository;
  @Mock
  private PendingAccountConstants pendingAccountConstants;
  @Mock
  private PendingAccountService underTest;

  @BeforeEach
  public void setup() {
    underTest = new PendingAccountServiceImpl(accountService, institutionService, emailService, pendingAccountRepository, pendingAccountConstants);
  }

  @Nested
  @DisplayName("checkIfExistsByEmail() method tests")
  class CheckIfExistsByEmailMethodTests {
    @Test
    @Description("Returns void if email is not found.")
    public void shouldReturnVoid_IfEmailIsNotFound() {
      String notExistingEmail = "notexistingemail@test.net";

      Mockito.when(pendingAccountRepository.existsByEmail(notExistingEmail)).thenReturn(false);
      Assertions.assertDoesNotThrow(() -> underTest.checkIfExistsByEmail(notExistingEmail));

      Mockito.verify(pendingAccountRepository, Mockito.times(1)).existsByEmail(notExistingEmail);
    }

    @Test
    @Description("Throws DataIntegrityViolationException if email is found.")
    public void shouldThrowDataIntegrityViolationException_IfEmailAlreadyExists() {
      String existingEmail = "existingemail@test.net";

      Mockito.when(pendingAccountRepository.existsByEmail(existingEmail)).thenReturn(true);
      Assertions.assertThrows(DataIntegrityViolationException.class, () -> underTest.checkIfExistsByEmail(existingEmail));

      Mockito.verify(pendingAccountRepository, Mockito.times(1)).existsByEmail(existingEmail);
    }
  }

  @Nested
  @DisplayName("addAccount() method tests")
  class AddAccountMethodTests {
    @Test
    @Description("Saves pendingAccount and returns void if no exceptions were thrown.")
    public void shouldSavePendingAccountAndReturnVoid_IfNoExceptionsWereThrown() {
      UUID institutionUuid = UUID.randomUUID();
      PendingAccountRegistrationDto pendingAccountRegistrationDto = new PendingAccountRegistrationDto(
        "Student",
        "Test User",
        "student@test.net",
        institutionUuid.toString()
      );

      Mockito.when(institutionService.findByUuid(institutionUuid)).thenReturn(Mockito.mock(Institution.class));

      underTest.addAccount(pendingAccountRegistrationDto);

      Mockito.verify(pendingAccountRepository, Mockito.times(1)).save(ArgumentMatchers.any(PendingAccount.class));
    }
  }
}
