/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.student.entity;

import java.util.ArrayList;
import java.util.List;
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
import net.tamasnovak.artifact.accounttype.student.dto.FinalDestinationTileDto;
import net.tamasnovak.artifact.accounttype.student.dto.FirmChoiceTileDto;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.common.utils.StringUtils;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.enums.status.FinalDestinationStatusType;
import net.tamasnovak.enums.status.ResponseStatusType;

/**
 * Entity class that represents the students database table.
 *
 * @since 0.0.1
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
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private Student(Account account, Mentor mentor) {
    super(account);
    this.mentor = mentor;
    this.applications = new ArrayList<>();
  }

  /**
   * The default student creator method.
   *
   * @param account The user's account.
   * @param mentor The mentor account that is to be connected with the user's student account.
   * @return {@link Student}
   */
  public static Student createStudent(final Account account, final Mentor mentor) {
    return new Student(account, mentor);
  }

  /**
   * Fetches the {@link Account}'s id connected to the given {@link Student} entity.
   *
   * @return The {@link Account} id connected with the given {@link Student} entity.
   */
  public UUID fetchStudentAccountUuid() {
    return this.account.getUuid();
  }

  /**
   * Creates a {@link FirmChoiceTileDto} object.
   *
   * @return {@link FirmChoiceTileDto} || null
   */
  public FirmChoiceTileDto createFirmChoiceTileDto() {
    final Application firmChoiceApplication = findFirmChoiceApplication();

    if (firmChoiceApplication == null) {
      return null;
    }

    return new FirmChoiceTileDto(firmChoiceApplication.fetchCountryName(), firmChoiceApplication.fetchUniversityName(),
      firmChoiceApplication.getCourseName());
  }

  /**
   * Retrieves the {@link Application} object that has its Response Status field set to 'Firm Choice'.
   * Each {@link Student} may only have one {@link Application} set to 'Firm Choice'.
   *
   * @return {@link FirmChoiceTileDto} || null
   */
  public Application findFirmChoiceApplication() {
    return applications.stream()
                       .filter(this::hasFirmChoiceStatus)
                       .findFirst()
                       .orElse(null);
  }

  /**
   * Checks if an {@link Application} has its Response Status field set to 'Firm Choice'.
   *
   * @param application The application object.
   * @return boolean
   */
  private boolean hasFirmChoiceStatus(final Application application) {
    return StringUtils.validateStringsAreEqual(application.retrieveResponseStatusName(), ResponseStatusType.FIRM_CHOICE.getValue());
  }

  /**
   * Creates a {@link FinalDestinationTileDto} object.
   *
   * @return {@link FinalDestinationTileDto} || null
   */
  public FinalDestinationTileDto createFinalDestinationTileDto() {
    final Application finalDestinationApplication = findFinalDestinationApplication();

    if (finalDestinationApplication == null) {
      return null;
    }

    return new FinalDestinationTileDto(finalDestinationApplication.fetchCountryName(),
      finalDestinationApplication.fetchUniversityName(), finalDestinationApplication.getCourseName());
  }

  /**
   * Retrieves the {@link Application} object that has its Final Destination Status field set either to 'Final Destination' or 'Final
   * Destination (Deferred Entry)'.
   * Each {@link Student} may only have one {@link Application} set to 'Final Destination' or 'Final Destination (Deferred Entry)'.
   *
   * @return {@link FirmChoiceTileDto} || null
   */
  public Application findFinalDestinationApplication() {
    return applications.stream()
                       .filter(this::hasFinalDestinationStatus)
                       .findFirst()
                       .orElse(null);
  }

  /**
   * Checks if an {@link Application} has its Final Destination Status field set either to 'Final Destination' or 'Final
   * Destination (Deferred Entry)'.
   *
   * @param application The application object.
   * @return boolean
   */
  private boolean hasFinalDestinationStatus(final Application application) {
    return StringUtils.validateStringsAreEqual(application.retrieveFinalDestinationName(),
      FinalDestinationStatusType.FINAL_DESTINATION.getValue())
      || StringUtils.validateStringsAreEqual(application.retrieveFinalDestinationName(),
      FinalDestinationStatusType.DEFERRED_FINAL_DESTINATION.getValue());
  }

  /**
   * Fetches the count of {@link Application} objects associated with the given {@link Student} account.
   *
   * @return The count of {@link Application} objects associated with the given {@link Student} account.
   */
  public int fetchApplicationNumber() {
    return this.applications.size();
  }

  /**
   * Counts the number of distinct values extracted from the list of {@link Application} objects using the provided extractor
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
   * @return The number of {@link Application} objects that match the predicate.
   */
  public int countApplicationsMatchingPredicate(final Predicate<? super Application> predicate) {
    return (int) applications.stream()
                             .filter(predicate)
                             .count();
  }
}
