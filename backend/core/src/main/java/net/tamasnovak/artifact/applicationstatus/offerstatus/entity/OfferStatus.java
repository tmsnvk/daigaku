/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.offerstatus.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.applicationstatus.common.entity.BaseStatusEntity;

/**
 * Entity class that represents the offer_status database table.
 *
 * @since 0.0.1
 */
@Entity
@Table(name = "offer_status")
public final class OfferStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "offerStatus")
  @JsonManagedReference(value = "offer_status-application_reference")
  private List<Application> applications;

  protected OfferStatus() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }
}
