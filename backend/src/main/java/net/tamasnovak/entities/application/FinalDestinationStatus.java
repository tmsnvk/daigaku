package net.tamasnovak.entities.application;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.base.status.BaseStatusEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "final_destination_status")
public final class FinalDestinationStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "finalDestinationStatus")
  @JsonManagedReference(value = "final_destination_status-application_reference")
  private List<Application> applications;

  protected FinalDestinationStatus() {}

  private FinalDestinationStatus(String name) {
    super(name);
    this.applications = new ArrayList<>();
  }
}
