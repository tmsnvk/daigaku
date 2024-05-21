package net.tamasnovak.services.account.accountByRole.student;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.repositories.account.accountByRole.StudentRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StudentServiceImplTest {
  @Mock
  private StudentRepository studentRepository;
  @Mock
  private GlobalServiceConstants globalServiceConstants;
  @InjectMocks
  private StudentServiceImpl underTest;

  private final Account mockAccount = mock(Account.class);

  @Nested
  @DisplayName("getStudentByAccount() unit tests")
  class GetStudentByAccountUnitTests {
    @Test
    @Description("Returns the correct Student record if it is found.")
    public void shouldReturnStudentRecord() {
      Student expected = mock(Student.class);
      when(studentRepository.findByAccount(mockAccount)).thenReturn(Optional.of(expected));

      Student actual = underTest.getStudentByAccount(mockAccount);
      verify(studentRepository, times(1)).findByAccount(mockAccount);

      assertEquals(expected, actual);
    }

    @Test
    @Description("Throws EntityNotFoundException if Student record is not found.")
    public void shouldThrowEntityNotFoundException_IfStudentRecordIsNotFound() {
      when(studentRepository.findByAccount(mockAccount)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getStudentByAccount(mockAccount));
      verify(studentRepository, times(1)).findByAccount(mockAccount);
    }
  }
}
