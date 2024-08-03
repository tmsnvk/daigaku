package net.tamasnovak.domains.applicationStages.responseStatus.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.domains.application.shared.entity.Application;
import net.tamasnovak.domains.applicationStages.shared.entity.BaseStatusEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "response_status")
public final class ResponseStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "responseStatus")
  @JsonManagedReference(value = "response_status-application_reference")
  private List<Application> applications;

  protected ResponseStatus() {}

  private ResponseStatus(String name) {
    super(name);
    this.applications = new ArrayList<>();
  }
}
