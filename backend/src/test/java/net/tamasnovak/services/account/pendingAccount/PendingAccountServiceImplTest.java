package net.tamasnovak.services.account.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.entities.account.baseAccount.PendingAccount;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.repositories.account.PendingAccountRepository;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.institution.InstitutionService;
import net.tamasnovak.utilities.StringFormatterUtilities;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.UUID;

import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class PendingAccountServiceImplTest {
  @Mock
  AccountService accountService;
  @Mock
  InstitutionService institutionService;
  @Mock
  EmailService emailService;
  @Mock
  PendingAccountRepository pendingAccountRepository;
  @Mock
  PendingAccountConstants pendingAccountConstants;
  @Mock
  StringFormatterUtilities stringFormatterUtilities;
  @Mock
  ValidatorUtilities validatorUtilities;
  PendingAccountService underTest;

  @BeforeEach
  public void setup() {
    underTest = new PendingAccountServiceImpl(accountService, institutionService, emailService, pendingAccountRepository, pendingAccountConstants, stringFormatterUtilities, validatorUtilities);
  }

  @Test
  @DisplayName("checkIfExistsByEmail Test")
  @Description("Returns void and does not throw DataIntegrityViolationException if email is not found.")
  void shouldReturnVoid_IfEmailIsNotFound() {
    String notExistingEmail = "notexistingemail@test.net";

    Mockito.when(pendingAccountRepository.existsByEmail(notExistingEmail)).thenReturn(false);
    Assertions.assertDoesNotThrow(() -> underTest.checkIfExistsByEmail(notExistingEmail));

    Mockito.verify(pendingAccountRepository, Mockito.times(1)).existsByEmail(notExistingEmail);
  }

  @Test
  @DisplayName("checkIfExistsByEmail Test")
  @Description("Throws DataIntegrityViolationException if email is found.")
  void shouldThrowDataIntegrityViolationException_IfEmailAlreadyExists() {
    String existingEmail = "existingemail@test.net";

    Mockito.when(pendingAccountRepository.existsByEmail(existingEmail)).thenReturn(true);
    Assertions.assertThrows(DataIntegrityViolationException.class, () -> underTest.checkIfExistsByEmail(existingEmail));

    Mockito.verify(pendingAccountRepository, Mockito.times(1)).existsByEmail(existingEmail);
  }

  @Test
  @DisplayName("addAccount Test")
  @Description("Returns void if email is not found.")
  void shouldSavePendingAccount_IfEmailIsNotFound() {
    UUID institutionUuid = UUID.randomUUID();
    Institution institution = new Institution("Test Institution");
    PendingAccountRegistrationDto pendingAccountRegistrationDto = new PendingAccountRegistrationDto(
      "Student",
      "Test User",
      "studentregistrationemail@test.net",
      institutionUuid.toString()
    );

    Mockito.when(validatorUtilities.validateIfStringIsUuid(pendingAccountRegistrationDto.institutionUuid())).thenReturn(institutionUuid);
    Mockito.when(institutionService.findByUuid(institutionUuid)).thenReturn(institution);

    underTest.addAccount(pendingAccountRegistrationDto);

    Mockito.verify(pendingAccountRepository, times(1)).save(ArgumentMatchers.any(PendingAccount.class));
  }
}
