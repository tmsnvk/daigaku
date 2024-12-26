/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.applicationstatus.common.entity.BaseStatusEntity;

/**
 * Entity class that represents the final_destination_status database table.
 */
@Entity
@Table(name = "final_destination_status")
public final class FinalDestinationStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "finalDestinationStatus")
  @JsonManagedReference(value = "final_destination_status-application_reference")
  private List<Application> applications;

  protected FinalDestinationStatus() {
    // There is no constructor as these Status fields are never meant to be updated.
    // The values are stored in the database solely to satisfy data normalisation rules.
    // Cannot be private or package-private as it is an @Entity class.
  }
}
