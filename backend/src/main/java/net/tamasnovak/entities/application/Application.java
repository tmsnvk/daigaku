package net.tamasnovak.entities.application;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import org.hibernate.annotations.UuidGenerator;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "applications")
public final class Application {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private long id;

  @Column(name = "uuid", updatable = false, nullable = false)
  @GeneratedValue(strategy = GenerationType.UUID)
  @UuidGenerator
  private UUID uuid;

  @Column(name = "created_at", updatable = false, nullable = false)
  @PastOrPresent
  private Timestamp createdAt;

  @Column(name = "last_updated_at", nullable = false)
  @PastOrPresent
  private Timestamp lastUpdatedAt;

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
  @NotNull
  private String courseName;

  @Column(name = "minor_subject")
  private String minorSubject;

  @Column(name = "programme_length", nullable = false)
  @NotNull
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
    this.createdAt = new Timestamp(System.currentTimeMillis());
    this.lastUpdatedAt = new Timestamp(System.currentTimeMillis());
    this.programmeLength = programmeLength;
  }

  public static Application createNewApplication(Account accountId, Country countryId, University universityId, String courseName, String minorSubject, ApplicationStatus applicationStatusId, int programmeLength) {
    return new Application(accountId, countryId, universityId, courseName, minorSubject, applicationStatusId, programmeLength);
  }

  public long getId() {
    return id;
  }

  public UUID getUuid() {
    return uuid;
  }

  public Timestamp getCreatedAt() {
    return createdAt;
  }

  public Timestamp getLastUpdatedAt() {
    return lastUpdatedAt;
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
