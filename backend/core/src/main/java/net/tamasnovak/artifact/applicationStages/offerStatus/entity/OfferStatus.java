package net.tamasnovak.artifact.applicationStages.offerStatus.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.applicationStages.shared.entity.BaseStatusEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "offer_status")
public final class OfferStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "offerStatus")
  @JsonManagedReference(value = "offer_status-application_reference")
  private List<Application> applications;

  protected OfferStatus() {}

  private OfferStatus(String name) {
    super(name);
    this.applications = new ArrayList<>();
  }
}
