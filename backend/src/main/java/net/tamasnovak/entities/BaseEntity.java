package net.tamasnovak.entities;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.PastOrPresent;

import java.sql.Timestamp;
import java.util.UUID;

@MappedSuperclass
public class BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true, updatable = false, nullable = false)
  private long id;

  @Column(name = "uuid", updatable = false, nullable = false)
  @org.hibernate.validator.constraints.UUID
  private UUID uuid;

  @Column(name = "created_at", updatable = false, nullable = false)
  @PastOrPresent
  private Timestamp createdAt;

  @Column(name = "last_updated_at", nullable = false)
  @PastOrPresent
  private Timestamp lastUpdatedAt;

  public BaseEntity() {
    this.createdAt = new Timestamp(System.currentTimeMillis());
    this.lastUpdatedAt = new Timestamp(System.currentTimeMillis());
  }

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
}
