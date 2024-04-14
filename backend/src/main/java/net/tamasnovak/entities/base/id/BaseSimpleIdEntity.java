package net.tamasnovak.entities.base.id;

import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseSimpleIdEntity extends BaseIdEntity {
  protected BaseSimpleIdEntity() {}
}
