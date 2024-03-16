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

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "final_destination_status")
public final class FinalDestinationStatus {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private long id;

  @Column(name = "uuid", updatable = false, nullable = false)
  @org.hibernate.validator.constraints.UUID
  private UUID uuid;

  @Column(name = "created_at", updatable = false, nullable = false)
  @PastOrPresent
  private Timestamp createdAt;

  @Column(name = "last_updated_at", nullable = false)
  @PastOrPresent
  private Timestamp lastUpdatedAt;

  @Column(name = "name", nullable = false)
  @NotBlank
  private String name;

  @OneToMany(mappedBy = "finalDestinationStatusId")
  @JsonManagedReference
  private Set<Application> applications;

  public FinalDestinationStatus() {}

  public FinalDestinationStatus(String name) {
    this.name = name;
    this.applications = new HashSet<>();
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

  public String getName() {
    return name;
  }

  public Set<Application> getApplications() {
    return applications;
  }
}
