package net.tamasnovak.entities.institution;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import net.tamasnovak.entities.base.audit.Auditable;
import net.tamasnovak.entities.base.id.BaseExtendedIdEntity;

@Entity
@Table(name = "institutions")
public final class Institution extends Auditable<BaseExtendedIdEntity> {
  @Column(name = "name", nullable = false)
  @NotBlank(message = "Provide the institution's name.")
  private String name;

  protected Institution() {}

  public String getName() {
    return name;
  }
}
