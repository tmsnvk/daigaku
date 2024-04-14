package net.tamasnovak.entities;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.PastOrPresent;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;
import java.util.UUID;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public abstract class BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true, insertable = false, updatable = false, nullable = false)
  private long id;

  @UuidGenerator
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "uuid", unique = true, insertable = false, updatable = false, nullable = false)
  private UUID uuid;

  @CreatedDate
  @CreationTimestamp
  @PastOrPresent
  @Column(name = "created_at", insertable = false, updatable = false, nullable = false)
  private Timestamp createdAt;

  @LastModifiedDate
  @UpdateTimestamp
  @PastOrPresent
  @Column(name = "last_updated_at", nullable = false)
  private Timestamp lastUpdatedAt;

  @CreatedBy
  @Column(name = "created_by", updatable = false, nullable = false)
  private String createdBy;

  @LastModifiedBy
  @Column(name = "last_modified_by", nullable = false)
  private String lastModifiedBy;

  protected BaseEntity() {}

  public long getId() {
    return id;
  }

  public UUID getUuid() {
    return uuid;
  }

  public Timestamp getCreatedAt() {
    return createdAt;
  }

  public Timestamp getLastUpdatedAt() {
    return lastUpdatedAt;
  }

  public void setLastUpdatedAt(Timestamp lastUpdatedAt) {
    this.lastUpdatedAt = lastUpdatedAt;
  }
}
