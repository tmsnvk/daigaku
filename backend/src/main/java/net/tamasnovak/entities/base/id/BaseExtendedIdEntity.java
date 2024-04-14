package net.tamasnovak.entities.base.id;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.MappedSuperclass;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@MappedSuperclass
public abstract class BaseExtendedIdEntity extends BaseIdEntity {
  @UuidGenerator
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "uuid", unique = true, insertable = false, updatable = false, nullable = false)
  private UUID uuid;

  protected BaseExtendedIdEntity() {}

  public UUID getUuid() {
    return uuid;
  }
}
