package net.tamasnovak.artifact.accountRole.student.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accountRole.mentor.entity.Mentor;
import net.tamasnovak.artifact.accountRole.shared.entity.BaseAccountRole;
import net.tamasnovak.artifact.accountRole.student.dto.FinalDestination;
import net.tamasnovak.artifact.accountRole.student.dto.FirmChoice;
import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.support.institution.entity.Institution;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.function.Function;
import java.util.function.Predicate;

@Entity
@Table(name = "students")
public final class Student extends BaseAccountRole {
  @ManyToOne
  @JoinColumn(name = "mentor_id", nullable = false)
  @JsonBackReference(value = "mentor-student_reference")
  private Mentor mentor;

  @ManyToOne
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference(value = "institution-student_reference")
  private Institution institution;

  @OneToMany(mappedBy = "student")
  @JsonManagedReference(value = "student-application_reference")
  private List<Application> applications;

  protected Student() {}

  private Student(Account account, Mentor mentor) {
    super(account);
    this.mentor = mentor;
    this.applications = new ArrayList<>();
  }

  public static Student createStudent(final Account account, final Mentor mentor) {
    return new Student(account, mentor);
  }

  public UUID getStudentAccountUuid() {
    return this.account.getUuid();
  }

  public FirmChoice getFirmChoiceDto(final String firmChoiceName) {
    final Application firmChoiceApplication = getFirmChoiceApplication(firmChoiceName);

    if (firmChoiceApplication == null) {
      return null;
    }

    return new FirmChoice(
      firmChoiceApplication.getCountryName(),
      firmChoiceApplication.getUniversityName(),
      firmChoiceApplication.getCourseName()
    );
  }

  public Application getFirmChoiceApplication(final String firmChoiceName) {
    return applications.stream()
      .filter(application -> this.hasFirmChoiceStatus(application, firmChoiceName))
      .findFirst()
      .orElse(null);
  }

  private boolean hasFirmChoiceStatus(final Application application, final String firmChoiceName) {
    return !application.isResponseStatusNull() && areValuesEqual(application.getResponseStatusName(), firmChoiceName);
  }

  public FinalDestination getFinalDestinationDto(final String finalDestinationName, final String deferredFinalDestinationName) {
    final Application finalDestinationApplication = getFinalDestinationApplication(finalDestinationName, deferredFinalDestinationName);

    if (finalDestinationApplication == null) {
      return null;
    }

    return new FinalDestination(
      finalDestinationApplication.getCountryName(),
      finalDestinationApplication.getUniversityName(),
      finalDestinationApplication.getCourseName()
    );
  }

  public Application getFinalDestinationApplication(final String finalDestinationName, final String deferredFinalDestinationName) {
    return applications.stream()
      .filter(application -> this.hasFinalDestinationStatus(application, finalDestinationName, deferredFinalDestinationName))
      .findFirst()
      .orElse(null);
  }

  private boolean hasFinalDestinationStatus(final Application application,
                                            final String finalDestinationName,
                                            final String deferredFinalDestinationName) {
    return !application.isFinalDestinationNull() &&
      (areValuesEqual(application.getFinalDestinationName(), finalDestinationName) || areValuesEqual(application.getFinalDestinationName(), deferredFinalDestinationName));
  }

  public int getApplicationNumber() {
    return applications.size();
  }

  public <T> int countApplicationsByDistinctValue(final Function<Application, T> extractor) {
    return (int) applications.stream()
      .map(extractor)
      .distinct()
      .count();
  }

  public int countApplicationsByPredicate(final Predicate<? super Application> predicate) {
    return (int) applications.stream()
      .filter(predicate)
      .count();
  }

  private boolean areValuesEqual(final String string, final String stringToCheckAgainst) {
    return Objects.equals(string, stringToCheckAgainst);
  }
}
