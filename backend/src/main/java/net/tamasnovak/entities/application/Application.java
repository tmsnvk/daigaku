package net.tamasnovak.entities.application;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.base.audit.Auditable;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;

import java.util.Objects;

@Entity
@Table(name = "applications")
public final class Application extends Auditable {
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "student_id", nullable = false)
  @JsonBackReference
  private Student student;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "country_id", nullable = false)
  @JsonBackReference
  private Country country;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "university_id", nullable = false)
  @JsonBackReference
  private University university;

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
  private ApplicationStatus applicationStatus;

  @ManyToOne
  @JoinColumn(name = "interview_status_id")
  @JsonBackReference
  private InterviewStatus interviewStatus;

  @ManyToOne
  @JoinColumn(name = "offer_status_id")
  @JsonBackReference
  private OfferStatus offerStatus;

  @ManyToOne
  @JoinColumn(name = "response_status_id")
  @JsonBackReference
  private ResponseStatus responseStatus;

  @ManyToOne
  @JoinColumn(name = "final_destination_status_id")
  @JsonBackReference
  private FinalDestinationStatus finalDestinationStatus;

  protected Application() {}

  private Application(Student student, Country country, University university, String courseName, String minorSubject, int programmeLength, ApplicationStatus applicationStatus) {
    this.student = student;
    this.country = country;
    this.university = university;
    this.courseName = courseName;
    this.minorSubject = enforceOptionalFieldValidation(minorSubject);
    this.applicationStatus = applicationStatus;
    this.programmeLength = programmeLength;
  }

  public static Application createNewApplicationByStudent(Student student, Country country, University university, String courseName, String minorSubject, int programmeLength, ApplicationStatus applicationStatus) {
    return new Application(student, country, university, courseName, minorSubject, programmeLength, applicationStatus);
  }

  public static String enforceOptionalFieldValidation(String fieldContent) {
    if (Objects.equals(fieldContent, "")) {
      return null;
    }

    return fieldContent;
  }

  public void updateStatusesByStudent(ApplicationStatus applicationStatus, InterviewStatus interviewStatus, OfferStatus offerStatus, ResponseStatus responseStatus, FinalDestinationStatus finalDestinationStatus) {
    this.applicationStatus = applicationStatus;
    this.interviewStatus = interviewStatus;
    this.offerStatus = offerStatus;
    this.responseStatus = responseStatus;
    this.finalDestinationStatus = finalDestinationStatus;
  }

  public Student getStudent() {
    return student;
  }

  public Country getCountry() {
    return country;
  }

  public University getUniversity() {
    return university;
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

  public ApplicationStatus getApplicationStatus() {
    return applicationStatus;
  }

  public InterviewStatus getInterviewStatus() {
    return interviewStatus;
  }

  public OfferStatus getOfferStatus() {
    return offerStatus;
  }

  public ResponseStatus getResponseStatus() {
    return responseStatus;
  }

  public FinalDestinationStatus getFinalDestinationStatus() {
    return finalDestinationStatus;
  }
}
