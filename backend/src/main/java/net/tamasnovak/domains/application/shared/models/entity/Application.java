package net.tamasnovak.domains.application.shared.models.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.domains.accountRole.student.models.entity.Student;
import net.tamasnovak.domains.applicationStages.applicationStatus.models.entity.ApplicationStatus;
import net.tamasnovak.domains.applicationStages.finalDestinationStatus.models.entity.FinalDestinationStatus;
import net.tamasnovak.domains.applicationStages.interviewStatus.models.entity.InterviewStatus;
import net.tamasnovak.domains.applicationStages.offerStatus.models.entity.OfferStatus;
import net.tamasnovak.domains.applicationStages.responseStatus.models.entity.ResponseStatus;
import net.tamasnovak.domains.shared.models.entities.audit.Auditable;
import net.tamasnovak.domains.support.country.models.entity.Country;
import net.tamasnovak.domains.support.university.models.entity.University;

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
  }

  public static Application createApplicationByStudent(Student student, Country country, University university, String courseName, String minorSubject, int programmeLength, ApplicationStatus applicationStatus) {
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

  public ApplicationStatus returnApplicationStatusIfSame(String requestBodyUuidString) {
    if (!this.isApplicationStatusNull() && areValuesEqual(this.applicationStatus.getUuid().toString(), requestBodyUuidString)) {
      return this.applicationStatus;
    }

    return null;
  }

  public InterviewStatus returnInterviewStatusIfSame(String requestBodyUuidString) {
    if (!this.isInterviewStatusNull() && areValuesEqual(this.interviewStatus.getUuid().toString(), requestBodyUuidString)) {
      return this.interviewStatus;
    }

    return null;
  }

  public OfferStatus returnOfferStatusIfSame(String requestBodyUuidString) {
    if (!this.isOfferStatusNull() && areValuesEqual(this.offerStatus.getUuid().toString(), requestBodyUuidString)) {
      return this.offerStatus;
    }

    return null;
  }

  public ResponseStatus returnResponseStatusIfSame(String requestBodyUuidString) {
    if (!this.isResponseStatusNull() && areValuesEqual(this.responseStatus.getUuid().toString(), requestBodyUuidString)) {
      return this.responseStatus;
    }

    return null;
  }

  public FinalDestinationStatus returnFinalDestinationStatusIfSame(String requestBodyUuidString) {
    if (!this.isFinalDestinationNull() && areValuesEqual(this.finalDestinationStatus.getUuid().toString(), requestBodyUuidString)) {
      return this.finalDestinationStatus;
    }

    return null;
  }

  public void updateStatusFields(ApplicationStatus applicationStatus, InterviewStatus interviewStatus, OfferStatus offerStatus, ResponseStatus responseStatus, FinalDestinationStatus finalDestinationStatus) {
    this.applicationStatus = updateOnlyIfNotNull(applicationStatus, this.applicationStatus);
    this.interviewStatus = updateOnlyIfNotNull(interviewStatus, this.interviewStatus);
    this.offerStatus = updateOnlyIfNotNull(offerStatus, this.offerStatus);
    this.responseStatus = updateOnlyIfNotNull(responseStatus, this.responseStatus);
    this.finalDestinationStatus = updateOnlyIfNotNull(finalDestinationStatus, this.finalDestinationStatus);
  }

  private <T> T updateOnlyIfNotNull(T newStatus, T currentStatus) {
    if (newStatus == null) {
      return currentStatus;
    }

    return newStatus;
  }

  private boolean areValuesEqual(String string, String stringToCheckAgainst) {
    return Objects.equals(string, stringToCheckAgainst);
  }
}
