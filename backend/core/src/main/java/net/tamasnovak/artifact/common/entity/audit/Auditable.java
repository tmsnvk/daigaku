/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.common.entity.audit;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import net.tamasnovak.artifact.common.entity.id.BaseExtendedIdEntity;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * Abstract base class for all entities that track timestamps and information on creation and updates.
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable extends BaseExtendedIdEntity {
  @Temporal(TemporalType.TIMESTAMP)
  @CreatedDate
  @Column(name = "created_at", updatable = false, nullable = false)
  protected Timestamp createdAt;

  @Temporal(TemporalType.TIMESTAMP)
  @LastModifiedDate
  @Column(name = "last_updated_at", nullable = false)
  protected Timestamp lastUpdatedAt;

  @CreatedBy
  @Column(name = "created_by", updatable = false, nullable = false)
  protected String createdBy;

  @LastModifiedBy
  @Column(name = "last_modified_by", nullable = false)
  protected String lastModifiedBy;

  protected Auditable() {
  }
}
