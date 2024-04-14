package net.tamasnovak.entities.application;

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
import jakarta.validation.constraints.Size;
import net.tamasnovak.entities.BaseEntity;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;

import java.util.Objects;

@Entity
@Table(name = "applications")
public final class Application extends BaseEntity {
  @ManyToOne
  @JoinColumn(name = "student_id", nullable = false)
  @JsonBackReference
  private Student studentId;

  @ManyToOne
  @JoinColumn(name = "country_id", nullable = false)
  @JsonBackReference
  private Country countryId;

  @ManyToOne
  @JoinColumn(name = "university_id", nullable = false)
  @JsonBackReference
  private University universityId;

  @Column(name = "course_name", nullable = false)
  @NotBlank(message = "Provide the title of your course.")
  @Size(min = 5, max = 255, message = "The name should be between 2 and 255 characters long.")
  private String courseName;

  @Column(name = "minor_subject")
  @Size(min = 5, max = 255, message = "The name should be between 2 and 255 characters long.")
  private String minorSubject;

  @Column(name = "programme_length", nullable = false)
  @NotNull(message = "Provide the length of your course (in years).")
  @Min(value = 2, message = "Programme length should not be less than 2.")
  @Max(value = 5, message = "Programme length should not be more than 5.")
  private int programmeLength;

  @ManyToOne
  @JoinColumn(name = "application_status_id")
  @JsonBackReference
  private ApplicationStatus applicationStatusId;

  @ManyToOne
  @JoinColumn(name = "interview_status_id")
  @JsonBackReference
  private InterviewStatus interviewStatusId;

  @ManyToOne
  @JoinColumn(name = "offer_status_id")
  @JsonBackReference
  private OfferStatus offerStatusId;

  @ManyToOne
  @JoinColumn(name = "response_status_id")
  @JsonBackReference
  private ResponseStatus responseStatusId;

  @ManyToOne
  @JoinColumn(name = "final_destination_status_id")
  @JsonBackReference
  private FinalDestinationStatus finalDestinationStatusId;

  @Column(name = "notes")
  private String notes;

  public Application() {}

  private Application(Student studentId, Country countryId, University universityId, String courseName, String minorSubject, int programmeLength, ApplicationStatus applicationStatusId) {
    this.studentId = studentId;
    this.countryId = countryId;
    this.universityId = universityId;
    this.courseName = courseName;
    this.minorSubject = enforceOptionalFieldValidation(minorSubject);
    this.applicationStatusId = applicationStatusId;
    this.programmeLength = programmeLength;
  }

  public static Application createNewApplicationByStudent(Student studentId, Country countryId, University universityId, String courseName, String minorSubject, int programmeLength, ApplicationStatus applicationStatusId) {
    return new Application(studentId, countryId, universityId, courseName, minorSubject, programmeLength, applicationStatusId);
  }

  public static String enforceOptionalFieldValidation(String fieldContent) {
    if (Objects.equals(fieldContent, "")) {
      return null;
    }

    return fieldContent;
  }

  public Student getStudentId() {
    return studentId;
  }

  public Country getCountryId() {
    return countryId;
  }

  public University getUniversityId() {
    return universityId;
  }

  public String getCourseName() {
    return courseName;
  }

  public String getMinorSubject() {
    return minorSubject;
  }

  public int getProgrammeLength() {
    return programmeLength;
  }

  public ApplicationStatus getApplicationStatusId() {
    return applicationStatusId;
  }

  public InterviewStatus getInterviewStatusId() {
    return interviewStatusId;
  }

  public OfferStatus getOfferStatusId() {
    return offerStatusId;
  }

  public ResponseStatus getResponseStatusId() {
    return responseStatusId;
  }

  public FinalDestinationStatus getFinalDestinationStatusId() {
    return finalDestinationStatusId;
  }

  public String getNotes() {
    return notes;
  }

  public void setApplicationStatusId(ApplicationStatus applicationStatusId) {
    this.applicationStatusId = applicationStatusId;
  }

  public void setInterviewStatusId(InterviewStatus interviewStatusId) {
    this.interviewStatusId = interviewStatusId;
  }

  public void setOfferStatusId(OfferStatus offerStatusId) {
    this.offerStatusId = offerStatusId;
  }

  public void setResponseStatusId(ResponseStatus responseStatusId) {
    this.responseStatusId = responseStatusId;
  }

  public void setFinalDestinationStatusId(FinalDestinationStatus finalDestinationStatusId) {
    this.finalDestinationStatusId = finalDestinationStatusId;
  }
}
