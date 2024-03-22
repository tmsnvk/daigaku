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
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;

@Entity
@Table(name = "applications")
public final class Application extends BaseEntity {
  @ManyToOne
  @JoinColumn(name = "account_id", nullable = false)
  @JsonBackReference
  private Account accountId;

  @ManyToOne
  @JoinColumn(name = "country", nullable = false)
  @JsonBackReference
  private Country countryId;

  @ManyToOne
  @JoinColumn(name = "university", nullable = false)
  @JsonBackReference
  private University universityId;

  @Column(name = "course_name", nullable = false)
  @NotBlank(message = "Provide the title of your course.")
  @Size(min = 2, max = 255, message = "The name should be between 2 and 255 characters long.")
  private String courseName;

  @Column(name = "minor_subject")
  @Size(min = 2, max = 255, message = "The name should be between 2 and 255 characters long.")
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

  private Application(Account accountId, Country countryId, University universityId, String courseName, String minorSubject, ApplicationStatus applicationStatusId, int programmeLength) {
    this.accountId = accountId;
    this.countryId = countryId;
    this.universityId = universityId;
    this.courseName = courseName;
    this.minorSubject = minorSubject;
    this.applicationStatusId = applicationStatusId;
    this.programmeLength = programmeLength;
  }

  public static Application createNewApplicationByStudent(Account accountId, Country countryId, University universityId, String courseName, String minorSubject, ApplicationStatus applicationStatusId, int programmeLength) {
    return new Application(accountId, countryId, universityId, courseName, minorSubject, applicationStatusId, programmeLength);
  }

  public Account getAccountId() {
    return accountId;
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
}
