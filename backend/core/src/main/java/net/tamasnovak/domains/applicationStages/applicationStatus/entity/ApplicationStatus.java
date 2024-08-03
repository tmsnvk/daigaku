package net.tamasnovak.domains.applicationStages.applicationStatus.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.domains.application.shared.entity.Application;
import net.tamasnovak.domains.applicationStages.shared.entity.BaseStatusEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "application_status")
public final class ApplicationStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "applicationStatus")
  @JsonManagedReference(value = "application_status-application_reference")
  private List<Application> applications;

  protected ApplicationStatus() {}

  private ApplicationStatus(String name) {
    super(name);
    this.applications = new ArrayList<>();
  }
}
