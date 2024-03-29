package net.tamasnovak.entities.application;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.BaseStatusEntity;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "offer_status")
public final class OfferStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "offerStatusId")
  @JsonManagedReference
  private Set<Application> applications;

  public OfferStatus() {}

  public OfferStatus(String name) {
    super(name);
    this.applications = new HashSet<>();
  }

  public Set<Application> getApplications() {
    return applications;
  }
}
