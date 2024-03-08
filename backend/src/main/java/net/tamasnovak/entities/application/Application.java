package net.tamasnovak.entities.application;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "applications")
@Getter
@NoArgsConstructor
public final class Application {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private int id;

  @Column(name = "uuid", updatable = false, nullable = false)
  @org.hibernate.validator.constraints.UUID
  private UUID uuid;

  @Column(name = "created_at")
  @PastOrPresent
  private Timestamp createdAt;

  @Column(name = "last_updated_at")
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

  @Column(name = "major_name")
  @NotNull
  private String majorName;

  @Column(name = "minor_name")
  private String minorName;

  @Column(name = "programme_length")
  @NotNull
  private int programmeLength;

  @ManyToOne
  @JoinColumn(name = "application_status_id", nullable = false)
  @JsonBackReference
  private ApplicationStatus applicationStatusId;

  @ManyToOne
  @JoinColumn(name = "interview_status_id", nullable = false)
  @JsonBackReference
  private InterviewStatus interviewStatusId;

  @ManyToOne
  @JoinColumn(name = "offer_status_id", nullable = false)
  @JsonBackReference
  private OfferStatus offerStatusId;

  @ManyToOne
  @JoinColumn(name = "response_status_id", nullable = false)
  @JsonBackReference
  private ResponseStatus responseStatusId;

  @ManyToOne
  @JoinColumn(name = "final_destination_status_id", nullable = false)
  @JsonBackReference
  private FinalDestinationStatus finalDestinationStatusId;

  @Column(name = "notes")
  private String notes;

  public Application(Country countryId, University universityId, String majorName, String minorName, int programmeLength, String notes) {
    this.countryId = countryId;
    this.universityId = universityId;
    this.majorName = majorName;
    this.minorName = minorName;
    this.programmeLength = programmeLength;
    this.notes = notes;
  }
}
