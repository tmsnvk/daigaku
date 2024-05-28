package net.tamasnovak.entities.status;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.base.status.BaseStatusEntity;

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
