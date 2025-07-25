/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.common.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.comment.entity.Comment;
import net.tamasnovak.artifact.common.entity.audit.Auditable;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.university.entity.University;
import net.tamasnovak.enums.status.ApplicationStatus;
import net.tamasnovak.enums.status.FinalDestinationStatus;
import net.tamasnovak.enums.status.InterviewStatus;
import net.tamasnovak.enums.status.OfferStatus;
import net.tamasnovak.enums.status.ResponseStatus;

/**
 * Entity class that represents the applications database table.
 */
@Entity
@Table(name = "applications")
public final class Application extends Auditable {
  @ManyToOne
  @JoinColumn(name = "student_id", nullable = false)
  @JsonBackReference(value = "student-application_reference")
  private Student student;

  @ManyToOne
  @JoinColumn(name = "country_id", nullable = false)
  @JsonBackReference(value = "country-application_reference")
  private Country country;

  @ManyToOne
  @JoinColumn(name = "university_id", nullable = false)
  @JsonBackReference(value = "university-application_reference")
  private University university;

  @Column(name = "course_name", nullable = false)
  @NotBlank(message = "Provide the name of your course.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{1,255}$", message =
    "Use only letters, spaces or hyphens. Provide a minimum of 1 and a maximum of 255 characters.")
  private String courseName;

  @Column(name = "minor_subject")
  @Pattern(regexp = "^(?:[\\p{IsAlphabetic}\\s-]{1,255}|)$", message =
    "Use only letters, spaces or hyphens. Provide a minimum of 1 and a maximum of 255 characters.")
  private String minorSubject;

  @Column(name = "programme_length", nullable = false)
  @NotNull(message = "Provide the length (year) of your selected course.")
  @Min(value = 1, message = "Programme length should not be less than {value}.")
  @Max(value = 5, message = "Programme length should not be more than {value}.")
  private int programmeLength;

  @Enumerated(EnumType.STRING)
  @Column(name = "application_status", nullable = false)
  private ApplicationStatus applicationStatus;

  @Enumerated(EnumType.STRING)
  @Column(name = "interview_status")
  private InterviewStatus interviewStatus;

  @Enumerated(EnumType.STRING)
  @Column(name = "offer_status")
  private OfferStatus offerStatus;

  @Enumerated(EnumType.STRING)
  @Column(name = "response_status")
  private ResponseStatus responseStatus;

  @Enumerated(EnumType.STRING)
  @Column(name = "final_destination_status")
  private FinalDestinationStatus finalDestinationStatus;

  @Column(name = "is_removable")
  @NotNull
  private boolean isRemovable;

  @OneToMany(mappedBy = "application")
  @JsonManagedReference(value = "application-comment_reference")
  private List<Comment> comments;

  protected Application() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private Application(
    Student student, Country country, University university, String courseName, String minorSubject,
    int programmeLength, ApplicationStatus applicationStatus) {
    this.student = student;
    this.country = country;
    this.university = university;
    this.courseName = courseName;
    this.minorSubject = minorSubject;
    this.applicationStatus = applicationStatus;
    this.programmeLength = programmeLength;
    this.isRemovable = false;
    this.comments = new ArrayList<>();
  }

  /**
   * The default application instance creator method for student authorised users.
   *
   * @param student The student account.
   * @param country The selected university's country.
   * @param university The selected university.
   * @param courseName The chosen course.
   * @param minorSubject The chosen courses minor, if there is one.
   * @param programmeLength The length of the programme.
   * @param applicationStatus The default status of the 'Application Status' field.
   * @return {@link Application}.
   */
  public static Application createApplicationByStudent(
    final Student student,
    final Country country,
    final University university,
    final String courseName,
    final String minorSubject,
    final int programmeLength,
    final ApplicationStatus applicationStatus) {
    return new Application(student, country, university, courseName, minorSubject, programmeLength, applicationStatus);
  }

  public String getCourseName() {
    return this.courseName;
  }

  public ApplicationStatus getApplicationStatus() {
    return this.applicationStatus;
  }

  public InterviewStatus getInterviewStatus() {
    return this.interviewStatus;
  }

  public OfferStatus getOfferStatus() {
    return this.offerStatus;
  }

  public ResponseStatus getResponseStatus() {
    return this.responseStatus;
  }

  public FinalDestinationStatus getFinalDestinationStatus() {
    return this.finalDestinationStatus;
  }

  /**
   * Fetches the {@link Student} account's uuid that is associated with the application.
   *
   * @return The {@link Student} account's uuid.
   */
  public UUID fetchStudentAccountUuid() {
    return this.student.fetchStudentAccountUuid();
  }

  /**
   * Fetches the application's {@link Country} name.
   *
   * @return The {@link Country}'s name.
   */
  public String fetchCountryName() {
    return this.country.getName();
  }

  /**
   * Fetches the application's {@link University} name.
   *
   * @return The {@link University}'s name.
   */
  public String fetchUniversityName() {
    return this.university.getName();
  }

  /**
   * Checks if the {@link Application}'s {@link ApplicationStatus} is null.
   *
   * @return boolean.
   */
  public boolean isApplicationStatusBlank() {
    return this.applicationStatus == null;
  }

  /**
   * Checks if the {@link InterviewStatus} field is null.
   *
   * @return boolean.
   */
  public boolean isInterviewStatusBlank() {
    return this.interviewStatus == null;
  }

  /**
   * Checks if the {@link OfferStatus} field is null.
   *
   * @return boolean.
   */
  public boolean isOfferStatusBlank() {
    return this.offerStatus == null;
  }

  /**
   * Checks if the {@link ResponseStatus} field is null.
   *
   * @return boolean.
   */
  public boolean isResponseStatusBlank() {
    return this.responseStatus == null;
  }

  /**
   * Checks if the {@link FinalDestinationStatus} field is null.
   *
   * @return boolean.
   */
  public boolean isFinalDestinationBlank() {
    return this.finalDestinationStatus == null;
  }

  /**
   * TODO
   *
   * @param applicationStatus
   * @param interviewStatus
   * @param offerStatus
   * @param responseStatus
   * @param finalDestinationStatus
   */
  public void updateStatusFields(
    final ApplicationStatus applicationStatus,
    final InterviewStatus interviewStatus,
    final OfferStatus offerStatus,
    final ResponseStatus responseStatus,
    final FinalDestinationStatus finalDestinationStatus) {
    this.applicationStatus = updateOnlyIfNotNull(applicationStatus, this.applicationStatus);
    this.interviewStatus = updateOnlyIfNotNull(interviewStatus, this.interviewStatus);
    this.offerStatus = updateOnlyIfNotNull(offerStatus, this.offerStatus);
    this.responseStatus = updateOnlyIfNotNull(responseStatus, this.responseStatus);
    this.finalDestinationStatus = updateFinalDestinationField(responseStatus, finalDestinationStatus, this.finalDestinationStatus);
  }

  /**
   * TODO
   *
   * @param newResponseStatus
   * @param newFinalDestinationStatus
   * @param currentFinalDestinationStatus
   * @return
   */
  public FinalDestinationStatus updateFinalDestinationField(
    final ResponseStatus newResponseStatus,
    final FinalDestinationStatus newFinalDestinationStatus,
    final FinalDestinationStatus currentFinalDestinationStatus) {
    if (newResponseStatus == ResponseStatus.OFFER_DECLINED) {
      return FinalDestinationStatus.NOT_FINAL_DESTINATION;
    }

    return updateOnlyIfNotNull(newFinalDestinationStatus, currentFinalDestinationStatus);
  }

  /**
   * TODO
   *
   * @param newStatus
   * @param currentStatus
   * @param <TStatus>
   * @return
   */
  private <TStatus> TStatus updateOnlyIfNotNull(TStatus newStatus, TStatus currentStatus) {
    if (newStatus == null) {
      return currentStatus;
    }

    return newStatus;
  }
}
