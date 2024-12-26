/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.responsestatus.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.applicationstatus.common.entity.BaseStatusEntity;

/**
 * Entity class that represents the response_status database table.
 */
@Entity
@Table(name = "response_status")
public final class ResponseStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "responseStatus")
  @JsonManagedReference(value = "response_status-application_reference")
  private List<Application> applications;

  protected ResponseStatus() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }
}
