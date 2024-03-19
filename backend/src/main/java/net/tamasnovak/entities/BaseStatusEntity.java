package net.tamasnovak.entities;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotBlank;

@MappedSuperclass
public abstract class BaseStatusEntity extends BaseEntity {
  @Column(name = "name", nullable = false)
  @NotBlank
  private String name;

  protected BaseStatusEntity() {}

  protected BaseStatusEntity(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
