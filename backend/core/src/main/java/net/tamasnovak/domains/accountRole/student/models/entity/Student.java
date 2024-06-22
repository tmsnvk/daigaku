package net.tamasnovak.domains.accountRole.student.models.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.accountRole.mentor.model.entity.Mentor;
import net.tamasnovak.domains.accountRole.shared.models.entities.BaseAccountRole;
import net.tamasnovak.domains.accountRole.student.models.dtoResponses.FinalDestinationDto;
import net.tamasnovak.domains.accountRole.student.models.dtoResponses.FirmChoiceDto;
import net.tamasnovak.domains.application.shared.models.entity.Application;
import net.tamasnovak.domains.support.institution.models.entity.Institution;

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

  public static Student createStudent(Account account, Mentor mentor) {
    return new Student(account, mentor);
  }

  public UUID getStudentAccountUuid() {
    return this.account.getUuid();
  }

  public FirmChoiceDto getFirmChoiceDto(String firmChoiceName) {
    Application application = getFirmChoiceApplication(firmChoiceName);

    if (application == null) {
      return null;
    }

    return new FirmChoiceDto(
      application.getCountryName(),
      application.getUniversityName(),
      application.getCourseName()
    );
  }

  public Application getFirmChoiceApplication(String firmChoiceName) {
    return applications.stream()
      .filter(element -> this.hasFirmChoiceStatus(element, firmChoiceName))
      .findFirst()
      .orElse(null);
  }

  private boolean hasFirmChoiceStatus(Application application, String firmChoiceName) {
    return !application.isResponseStatusNull() && areValuesEqual(application.getResponseStatusName(), firmChoiceName);
  }

  public FinalDestinationDto getFinalDestinationDto(String finalDestinationName, String deferredFinalDestinationName) {
    Application application = getFinalDestinationApplication(finalDestinationName, deferredFinalDestinationName);

    if (application == null) {
      return null;
    }

    return new FinalDestinationDto(
      application.getCountryName(),
      application.getUniversityName(),
      application.getCourseName()
    );
  }

  public Application getFinalDestinationApplication(String finalDestinationName, String deferredFinalDestinationName) {
    return applications.stream()
      .filter(element -> this.hasFinalDestinationStatus(element, finalDestinationName, deferredFinalDestinationName))
      .findFirst()
      .orElse(null);
  }

  private boolean hasFinalDestinationStatus(Application application, String finalDestinationName, String deferredFinalDestinationName) {
    return !application.isFinalDestinationNull() && (areValuesEqual(application.getFinalDestinationName(), finalDestinationName) || areValuesEqual(application.getFinalDestinationName(), deferredFinalDestinationName));
  }

  public int getApplicationNumber() {
    return applications.size();
  }

  public <T> int countApplicationsByDistinctValue(Function<Application, T> extractor) {
    return (int) applications.stream()
      .map(extractor)
      .distinct()
      .count();
  }

  public int countApplicationsByPredicate(Predicate<? super Application> predicate) {
    return (int) applications.stream()
      .filter(predicate)
      .count();
  }

  private boolean areValuesEqual(String string, String stringToCheckAgainst) {
    return Objects.equals(string, stringToCheckAgainst);
  }
}
