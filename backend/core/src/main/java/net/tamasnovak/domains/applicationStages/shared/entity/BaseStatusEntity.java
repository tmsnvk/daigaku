package net.tamasnovak.domains.applicationStages.shared.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotBlank;
import net.tamasnovak.domains.shared.entity.audit.Auditable;

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
    return this.name;
  }
}
