/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.common.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotBlank;
import net.tamasnovak.artifact.common.entity.id.BaseExtendedIdEntity;

/**
 * Abstract entity class that represents an ancestor class for status-type entities.
 *
 * @since 0.0.1
 */
@MappedSuperclass
public abstract class BaseStatusEntity extends BaseExtendedIdEntity {
  @Column(name = "name", nullable = false)
  @NotBlank(message = "Provide the name of your application entity.")
  private String name;

  protected BaseStatusEntity() {
  }

  protected BaseStatusEntity(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }
}
