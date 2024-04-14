package net.tamasnovak.entities.base.audit;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.PastOrPresent;
import net.tamasnovak.entities.base.id.BaseIdEntity;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable <T extends BaseIdEntity> extends BaseIdEntity {
  private T baseIdEntity;

  @Temporal(TemporalType.TIMESTAMP)
  @PastOrPresent
  @CreatedDate
  @Column(name = "created_at", insertable = false, updatable = false, nullable = false)
  private Timestamp createdAt;

  @Temporal(TemporalType.TIMESTAMP)
  @PastOrPresent
  @LastModifiedDate
  @Column(name = "last_updated_at", nullable = false)
  private Timestamp lastUpdatedAt;

  @CreatedBy
  @Column(name = "created_by", updatable = false, nullable = false)
  private String createdBy;

  @LastModifiedBy
  @Column(name = "last_modified_by", nullable = false)
  private String lastModifiedBy;

  protected Auditable() {}

  public T getBaseIdEntity() {
    return baseIdEntity;
  }

  public Timestamp getCreatedAt() {
    return createdAt;
  }

  public Timestamp getLastUpdatedAt() {
    return lastUpdatedAt;
  }

  public String getCreatedBy() {
    return createdBy;
  }

  public String getLastModifiedBy() {
    return lastModifiedBy;
  }
}
