package net.tamasnovak.entities.application;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.base.status.BaseStatusEntity;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "response_status")
public final class ResponseStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "responseStatus")
  @JsonManagedReference
  private Set<Application> applications;

  protected ResponseStatus() {}

  public ResponseStatus(String name) {
    super(name);
    this.applications = new HashSet<>();
  }
}
