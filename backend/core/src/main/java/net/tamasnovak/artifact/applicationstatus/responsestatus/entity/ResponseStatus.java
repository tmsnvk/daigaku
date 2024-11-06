package net.tamasnovak.artifact.applicationstatus.responsestatus.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.applicationstatus.shared.entity.BaseStatusEntity;

@Entity
@Table(name = "response_status")
public final class ResponseStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "responseStatus")
  @JsonManagedReference(value = "response_status-application_reference")
  private List<Application> applications;

  protected ResponseStatus() {
  }

  private ResponseStatus(String name) {
    super(name);
    this.applications = new ArrayList<>();
  }
}
