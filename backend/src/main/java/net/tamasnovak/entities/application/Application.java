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
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.base.audit.Auditable;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;

@Entity
@Table(name = "applications")
public final class Application extends Auditable {
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "student_id", nullable = false)
  @JsonBackReference(value = "student_application_reference")
  private Student student;

  @ManyToOne
  @JoinColumn(name = "country_id", nullable = false)
  @JsonBackReference(value = "country_application_reference")
  private Country country;

  @ManyToOne
  @JoinColumn(name = "university_id", nullable = false)
  @JsonBackReference(value = "university_application_reference")
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
  @JsonBackReference(value = "application_status_application_reference")
  private ApplicationStatus applicationStatus;

  @ManyToOne
  @JoinColumn(name = "interview_status_id")
  @JsonBackReference(value = "interview_status_application_reference")
  private InterviewStatus interviewStatus;

  @ManyToOne
  @JoinColumn(name = "offer_status_id")
  @JsonBackReference(value = "offer_status_application_reference")
  private OfferStatus offerStatus;

  @ManyToOne
  @JoinColumn(name = "response_status_id")
  @JsonBackReference(value = "response_status_application_reference")
  private ResponseStatus responseStatus;

  @ManyToOne
  @JoinColumn(name = "final_destination_status_id")
  @JsonBackReference(value = "final_destination_status_application_reference")
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

  public boolean isRemovable() {
    return isRemovable;
  }

  public void updateStatusFields(ApplicationStatus applicationStatus, InterviewStatus interviewStatus, OfferStatus offerStatus, ResponseStatus responseStatus, FinalDestinationStatus finalDestinationStatus) {
    this.applicationStatus = applicationStatus;
    this.interviewStatus = interviewStatus;
    this.offerStatus = offerStatus;
    this.responseStatus = responseStatus;
    this.finalDestinationStatus = finalDestinationStatus;
  }
}
