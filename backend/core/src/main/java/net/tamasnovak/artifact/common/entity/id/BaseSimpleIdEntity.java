/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.common.entity.id;

import java.io.Serial;
import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

/**
 * Abstract base class for all entities that utilise a simple identification mechanism.
 *
 * @since 0.0.1
 */
@MappedSuperclass
public abstract class BaseSimpleIdEntity implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true, updatable = false, nullable = false)
  protected long id;

  protected BaseSimpleIdEntity() {
  }

  public long getId() {
    return this.id;
  }
}
