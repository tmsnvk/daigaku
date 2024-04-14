package net.tamasnovak.entities.base.status;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotBlank;
import net.tamasnovak.entities.base.audit.Auditable;

@MappedSuperclass
public abstract class BaseStatusEntity extends Auditable {
  @Column(name = "name", nullable = false)
  @NotBlank(message = "Provide the name of your application entity.")
  private String name;

  protected BaseStatusEntity() {}

  protected BaseStatusEntity(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
