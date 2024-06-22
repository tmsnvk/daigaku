package net.tamasnovak.domains.shared.models.entities.id;

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
  @Column(name = "id", unique = true, updatable = false, nullable = false)
  protected long id;

  @UuidGenerator(style = UuidGenerator.Style.RANDOM)
  @Column(name = "uuid", unique = true, updatable = false, nullable = false)
  protected UUID uuid;

  protected BaseExtendedIdEntity() {}

  public long getId() {
    return this.id;
  }

  public UUID getUuid() {
    return this.uuid;
  }
}
