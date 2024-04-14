package net.tamasnovak.entities.application;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.base.status.BaseStatusEntity;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "application_status")
public final class ApplicationStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "applicationStatus")
  @JsonManagedReference
  private Set<Application> applications;

  protected ApplicationStatus() {}

  public ApplicationStatus(String name) {
    super(name);
    this.applications = new HashSet<>();
  }

  public Set<Application> getApplications() {
    return applications;
  }
}
