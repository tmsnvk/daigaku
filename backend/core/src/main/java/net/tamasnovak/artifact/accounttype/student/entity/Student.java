/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.student.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;
import java.util.function.Predicate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.common.entity.BaseAccountType;
import net.tamasnovak.artifact.accounttype.mentor.entity.Mentor;
import net.tamasnovak.artifact.accounttype.student.dto.FinalDestinationTileDetails;
import net.tamasnovak.artifact.accounttype.student.dto.FirmChoiceTileDetails;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstatus.responsestatus.entity.ResponseStatus;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.utils.StringUtils;

/**
 * Entity class that represents the student's database table.
 */
@Entity
@Table(name = "students")
public final class Student extends BaseAccountType {
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

  protected Student() {
    // Not public as it should not be initialized blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private Student(Account account, Mentor mentor) {
    super(account);
    this.mentor = mentor;
    this.applications = new ArrayList<>();
  }

  /**
   * The default student instance creator method.
   *
   * @param account The user's account.
   * @param mentor The mentor account that is to be connected with the user's student account.
   * @return {@link Student}.
   */
  public static Student createStudent(final Account account, final Mentor mentor) {
    return new Student(account, mentor);
  }

  /**
   * Fetches the {@link Account}'s id connected to the given {@link Student} entity.
   *
   * @return {@link Account}.
   */
  public UUID fetchStudentAccountUuid() {
    return this.account.getUuid();
  }

  /**
   * Creates a {@link FirmChoiceTileDetails} object.
   *
   * @return {@link FirmChoiceTileDetails} or {@code null} if the {@link Student} has no {@link Application} marked as
   * {@link net.tamasnovak.enums.status.ResponseStatus#FIRM_CHOICE}.
   */
  public FirmChoiceTileDetails createFirmChoiceTileDetails(final String firmChoiceStatusName) {
    final Optional<Application> firmChoiceApplication = findFirmChoiceApplication(firmChoiceStatusName);

    if (firmChoiceApplication.isEmpty()) {
      return null;
    }

    final Application application = firmChoiceApplication.get();

    return new FirmChoiceTileDetails(application.fetchCountryName(), application.fetchUniversityName(), application.getCourseName());
  }

  /**
   * Finds the {@link Application} object that has its {@link ResponseStatus} field set to
   * {@link net.tamasnovak.enums.status.ResponseStatus#FIRM_CHOICE}.
   * Each {@link Student} may only have one {@link Application} set to {@link net.tamasnovak.enums.status.ResponseStatus#FIRM_CHOICE}.
   *
   * @return {@link Optional#of(Application)}.
   */
  public Optional<Application> findFirmChoiceApplication(final String firmChoiceStatusName) {
    return applications.stream()
                       .filter(
                         application -> StringUtils.validateStringsAreEqual(application.fetchResponseStatusName(), firmChoiceStatusName))
                       .findFirst();
  }

  /**
   * Creates a {@link FinalDestinationTileDetails} object.
   *
   * @return {@link FinalDestinationTileDetails} or {@code null} if the {@link Student} has no {@link Application} marked as
   * {@link net.tamasnovak.enums.status.FinalDestinationStatus#FINAL_DESTINATION} or
   * {@link net.tamasnovak.enums.status.FinalDestinationStatus#DEFERRED_FINAL_DESTINATION}.
   */
  public FinalDestinationTileDetails createFinalDestinationTileDetails(
    final String finalDestinationStatusName,
    final String deferredFinalDestinationStatusName) {
    final Optional<Application> finalDestinationApplication = findFinalDestinationApplication(finalDestinationStatusName,
      deferredFinalDestinationStatusName);

    if (finalDestinationApplication.isEmpty()) {
      return null;
    }

    final Application application = finalDestinationApplication.get();

    return new FinalDestinationTileDetails(application.fetchCountryName(), application.fetchUniversityName(), application.getCourseName());
  }

  /**
   * Finds the {@link Application} object that has its {@link FinalDestinationStatus} field set either to
   * {@link net.tamasnovak.enums.status.FinalDestinationStatus#FINAL_DESTINATION} or
   * {@link net.tamasnovak.enums.status.FinalDestinationStatus#DEFERRED_FINAL_DESTINATION}.
   * Each {@link Student} may only have one {@link Application} set either to
   * {@link net.tamasnovak.enums.status.FinalDestinationStatus#FINAL_DESTINATION} or
   * {@link net.tamasnovak.enums.status.FinalDestinationStatus#DEFERRED_FINAL_DESTINATION}.
   *
   * @return {@link Optional#of(Application)}.
   */
  public Optional<Application> findFinalDestinationApplication(
    final String finalDestinationStatusName,
    final String deferredFinalDestinationStatusName) {
    return applications.stream()
                       .filter(application -> StringUtils.validateStringsAreEqual(application.fetchFinalDestinationName(),
                         finalDestinationStatusName)
                         || StringUtils.validateStringsAreEqual(application.fetchFinalDestinationName(),
                         deferredFinalDestinationStatusName))
                       .findFirst();
  }

  /**
   * Fetches the number of {@link Application} objects associated with the given {@link Student} account.
   *
   * @return The number of {@link Application} objects associated with the given {@link Student} account.
   */
  public int fetchApplicationNumber() {
    return this.applications.size();
  }

  /**
   * Counts of distinct values extracted from the list of {@link Application} objects using the provided extractor
   * function.
   *
   * @param extractor A function that extracts a value from an application object for the purpose of counting distinct values.
   * @param <T> The type of the value returned by the extractor function.
   * @return The count of distinct values extracted from the {@link Application} objects.
   */
  public <T> int countDistinctApplicationsByValue(final Function<Application, T> extractor) {
    return (int) applications.stream()
                             .map(extractor)
                             .distinct()
                             .count();
  }

  /**
   * Counts the number of {@link Application} objects that match the specified predicate.
   *
   * @param predicate A condition each application object must satisfy to be counted.
   * @return The count of {@link Application} objects that match the predicate.
   */
  public int countApplicationsMatchingPredicate(final Predicate<? super Application> predicate) {
    return (int) applications.stream()
                             .filter(predicate)
                             .count();
  }
}
