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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "application_status")
@Getter
@NoArgsConstructor
public final class ApplicationStatus {
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

  @Column(name = "name")
  @NotBlank
  private String name;

  @OneToMany(mappedBy = "applicationStatusId")
  @JsonManagedReference
  private List<Application> applications;

  public ApplicationStatus(String name) {
    this.name = name;
    this.applications = new ArrayList<>();
  }
}
