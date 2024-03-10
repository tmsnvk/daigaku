package net.tamasnovak.entities.application;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "interview_status")
@Getter
@NoArgsConstructor
public final class InterviewStatus {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private long id;

  @Column(name = "uuid", updatable = false, nullable = false)
  @org.hibernate.validator.constraints.UUID
  private UUID uuid;

  @Column(name = "created_at")
  @PastOrPresent
  private Timestamp createdAt;

  @Column(name = "last_updated_at")
  @PastOrPresent
  private Timestamp lastUpdatedAt;

  @Column(name = "name")
  @NotBlank
  private String name;

  @OneToMany(mappedBy = "interviewStatusId")
  @JsonManagedReference
  private Set<Application> applications;

  public InterviewStatus(String name) {
    this.name = name;
    this.applications = new HashSet<>();
  }
}
