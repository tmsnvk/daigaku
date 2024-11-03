package net.tamasnovak.artifact.accounttype.student.service;

import java.util.Optional;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.accounttype.student.persistence.StudentRepository;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
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
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StudentServiceImplTest {
  @Mock
  private StudentRepository studentRepository;

  @Mock
  private GlobalServiceMessages globalServiceMessages;

  @InjectMocks
  private StudentServiceImpl underTest;

  @Nested
  @DisplayName("getByAccount() unit tests")
  class GetByAccountUnitTests {
    private final Account mockAccount = mock(Account.class);

    @Test
    @Description("Returns the correct Student record if it is found.")
    void shouldReturnStudentRecord() {
      Student expected = mock(Student.class);
      when(studentRepository.findStudentByAccount(mockAccount)).thenReturn(Optional.of(expected));

      Student actual = underTest.findStudentByAccount(mockAccount);

      assertEquals(expected, actual);

      verify(studentRepository, times(1)).findStudentByAccount(mockAccount);
    }

    @Test
    @Description("Throws EntityNotFoundException if Student record is not found.")
    void shouldThrowEntityNotFoundException_IfStudentRecordIsNotFound() {
      when(studentRepository.findStudentByAccount(mockAccount)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findStudentByAccount(mockAccount));

      verify(studentRepository, times(1)).findStudentByAccount(mockAccount);
    }
  }
}
