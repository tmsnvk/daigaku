/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.common.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.artifact.common.entity.audit.Auditable;

/**
 * Abstract entity class that represents an ancestor class for support-related entities.
 *
 * @since 0.0.1
 */
@MappedSuperclass
public abstract class BaseSupportEntity extends Auditable {
  @Column(name = "name", nullable = false)
  @Pattern(regexp = "^[\\p{IsAlphabetic}-\\s]{2,100}$", message =
    "Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.")
  protected String name;

  protected BaseSupportEntity() {
  }

  protected BaseSupportEntity(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }
}
