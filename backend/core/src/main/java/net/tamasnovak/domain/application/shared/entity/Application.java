package net.tamasnovak.domain.application.shared.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.domain.accountRole.student.entity.Student;
import net.tamasnovak.domain.applicationStages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.domain.applicationStages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.domain.applicationStages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.domain.applicationStages.offerStatus.entity.OfferStatus;
import net.tamasnovak.domain.applicationStages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.domain.comment.entity.Comment;
import net.tamasnovak.domain.shared.entity.audit.Auditable;
import net.tamasnovak.domain.support.country.entity.Country;
import net.tamasnovak.domain.support.university.entity.University;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

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
  @NotBlank(message = "Provide the title of your course.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}-\\s]{5,255}$", message = "Use only letters and spaces. Provide a minimum of 5 and a maximum of 255 characters.")
  private String courseName;

  @Column(name = "minor_subject")
  @Pattern(regexp = "^(?:[\\p{IsAlphabetic}-\\s]{5,255}|)$", message = "Use only letters and spaces. Provide a minimum of 5 and a maximum of 255 characters.")
  private String minorSubject;

  @Column(name = "programme_length", nullable = false)
  @NotNull(message = "Provide the length of your course (in years).")
  @Min(value = 2, message = "Programme length should not be less than {value}.")
  @Max(value = 5, message = "Programme length should not be more than {value}.")
  private int programmeLength;

  @ManyToOne
  @JoinColumn(name = "application_status_id")
  @JsonBackReference(value = "application_status-application_reference")
  private ApplicationStatus applicationStatus;

  @ManyToOne
  @JoinColumn(name = "interview_status_id")
  @JsonBackReference(value = "interview_status-application_reference")
  private InterviewStatus interviewStatus;

  @ManyToOne
  @JoinColumn(name = "offer_status_id")
  @JsonBackReference(value = "offer_status-application_reference")
  private OfferStatus offerStatus;

  @ManyToOne
  @JoinColumn(name = "response_status_id")
  @JsonBackReference(value = "response_status-application_reference")
  private ResponseStatus responseStatus;

  @ManyToOne
  @JoinColumn(name = "final_destination_status_id")
  @JsonBackReference(value = "final_destination_status-application_reference")
  private FinalDestinationStatus finalDestinationStatus;

  @Column(name = "is_removable")
  @NotNull
  private boolean isRemovable;

  @OneToMany(mappedBy = "application")
  @JsonManagedReference(value = "application-comment_reference")
  private List<Comment> comments;

  protected Application() {}

  private Application(Student student, Country country, University university, String courseName, String minorSubject, int programmeLength, ApplicationStatus applicationStatus) {
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

  public static Application createApplicationByStudent(final Student student,
                                                       final Country country,
                                                       final University university,
                                                       final String courseName,
                                                       final String minorSubject,
                                                       final int programmeLength,
                                                       final ApplicationStatus applicationStatus) {
    return new Application(student, country, university, courseName, minorSubject, programmeLength, applicationStatus);
  }

  public UUID getStudentAccountUuid() {
    return this.student.getStudentAccountUuid();
  }

  public String getCountryName() {
    return this.country.getName();
  }

  public String getUniversityName() {
    return this.university.getName();
  }

  public String getCourseName() {
    return this.courseName;
  }

  public boolean isApplicationStatusNull() {
    return this.applicationStatus == null;
  }

  public boolean isInterviewStatusNull() {
    return this.interviewStatus == null;
  }

  public boolean isOfferStatusNull() {
    return this.offerStatus == null;
  }

  public boolean isResponseStatusNull() {
    return this.responseStatus == null;
  }

  public boolean isFinalDestinationNull() {
    return this.finalDestinationStatus == null;
  }

  public UUID getApplicationStatusUuid() {
    return this.applicationStatus.getUuid();
  }

  public UUID getInterviewStatusUuid() {
    return this.interviewStatus.getUuid();
  }

  public UUID getOfferStatusUuid() {
    return this.offerStatus.getUuid();
  }

  public UUID getResponseStatusUuid() {
    return this.responseStatus.getUuid();
  }

  public UUID getFinalDestinationStatusUuid() {
    return this.finalDestinationStatus.getUuid();
  }

  public String getApplicationStatusName() {
    return this.applicationStatus.getName();
  }

  public String getResponseStatusName() {
    return this.responseStatus.getName();
  }

  public String getFinalDestinationName() {
    return this.finalDestinationStatus.getName();
  }

  public ApplicationStatus returnApplicationStatusIfSame(final UUID statusUuid) {
    if (!this.isApplicationStatusNull() && areValuesEqual(this.applicationStatus.getUuid(), statusUuid)) {
      return this.applicationStatus;
    }

    return null;
  }

  public InterviewStatus returnInterviewStatusIfSame(final UUID statusUuid) {
    if (!this.isInterviewStatusNull() && areValuesEqual(this.interviewStatus.getUuid(), statusUuid)) {
      return this.interviewStatus;
    }

    return null;
  }

  public OfferStatus returnOfferStatusIfSame(final UUID statusUuid) {
    if (!this.isOfferStatusNull() && areValuesEqual(this.offerStatus.getUuid(), statusUuid)) {
      return this.offerStatus;
    }

    return null;
  }

  public ResponseStatus returnResponseStatusIfSame(final UUID statusUuid) {
    if (!this.isResponseStatusNull() && areValuesEqual(this.responseStatus.getUuid(), statusUuid)) {
      return this.responseStatus;
    }

    return null;
  }

  public FinalDestinationStatus returnFinalDestinationStatusIfSame(final UUID statusUuid) {
    if (!this.isFinalDestinationNull() && areValuesEqual(this.finalDestinationStatus.getUuid(), statusUuid)) {
      return this.finalDestinationStatus;
    }

    return null;
  }

  public void updateStatusFields(final ApplicationStatus applicationStatus,
                                 final InterviewStatus interviewStatus,
                                 final OfferStatus offerStatus,
                                 final ResponseStatus responseStatus,
                                 final FinalDestinationStatus finalDestinationStatus,
                                 final ResponseStatus offerDeclined,
                                 final FinalDestinationStatus notFinalDestination) {
    this.applicationStatus = updateOnlyIfNotNull(applicationStatus, this.applicationStatus);
    this.interviewStatus = updateOnlyIfNotNull(interviewStatus, this.interviewStatus);
    this.offerStatus = updateOnlyIfNotNull(offerStatus, this.offerStatus);
    this.responseStatus = updateOnlyIfNotNull(responseStatus, this.responseStatus);
    this.finalDestinationStatus = updateFinalDestinationField(responseStatus, finalDestinationStatus, this.finalDestinationStatus, offerDeclined, notFinalDestination);
  }

  public FinalDestinationStatus updateFinalDestinationField(final ResponseStatus newResponseStatus,
                                                            final FinalDestinationStatus newFinalDestinationStatus,
                                                            final FinalDestinationStatus currentFinalDestinationStatus,
                                                            final ResponseStatus offerDeclined,
                                                            final FinalDestinationStatus notFinalDestination) {
    if (newResponseStatus != null && areValuesEqual(newResponseStatus.getName(), offerDeclined.getName())) {
      return notFinalDestination;
    }

    return updateOnlyIfNotNull(newFinalDestinationStatus, currentFinalDestinationStatus);
  }

  private <T> T updateOnlyIfNotNull(T newStatus, T currentStatus) {
    if (newStatus == null) {
      return currentStatus;
    }

    return newStatus;
  }

  private boolean areValuesEqual(final String string, final String stringToCheckAgainst) {
    return Objects.equals(string, stringToCheckAgainst);
  }

  private boolean areValuesEqual(final UUID uuid, final UUID uuidToCheckAgainst) {
    return Objects.equals(uuid, uuidToCheckAgainst);
  }
}
