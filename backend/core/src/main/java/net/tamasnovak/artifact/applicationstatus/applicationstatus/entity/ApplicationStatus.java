/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.applicationstatus.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.applicationstatus.common.entity.BaseStatusEntity;

/**
 * Entity class that represents the application_status database table.
 *
 * @since 0.0.1
 */
@Entity
@Table(name = "application_status")
public final class ApplicationStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "applicationStatus")
  @JsonManagedReference(value = "application_status-application_reference")
  private List<Application> applications;

  protected ApplicationStatus() {
    // There is no constructor as these Status fields are never meant to be updated.
    // The values are stored in the database solely to satisfy data normalisation rules.
    // Cannot be private or package-private as it is an @Entity class.
  }
}
