package net.tamasnovak.entities.base.id;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import org.hibernate.annotations.UuidGenerator;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@MappedSuperclass
public abstract class BaseExtendedIdEntity implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true, insertable = false, updatable = false, nullable = false)
  private long id;

  @UuidGenerator
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "uuid", unique = true, insertable = false, updatable = false, nullable = false)
  private UUID uuid;

  protected BaseExtendedIdEntity() {}

  public long getId() {
    return id;
  }

  public UUID getUuid() {
    return uuid;
  }
}
