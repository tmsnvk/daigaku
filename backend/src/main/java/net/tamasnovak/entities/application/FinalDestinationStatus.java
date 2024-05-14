package net.tamasnovak.entities.application;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.base.status.BaseStatusEntity;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "final_destination_status")
public final class FinalDestinationStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "finalDestinationStatus")
  @JsonManagedReference
  private Set<Application> applications;

  protected FinalDestinationStatus() {}

  private FinalDestinationStatus(String name) {
    super(name);
    this.applications = new HashSet<>();
  }
}
