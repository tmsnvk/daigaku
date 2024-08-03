package net.tamasnovak.domains.support.shared.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.domains.shared.entity.audit.Auditable;

@MappedSuperclass
public abstract class BaseSupportEntity extends Auditable {
  @Column(name = "name", nullable = false)
  @Pattern(regexp = "^[\\p{IsAlphabetic}-\\s]{2,100}$", message = "Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.")
  protected String name;

  protected BaseSupportEntity() {}

  protected BaseSupportEntity(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }
}
