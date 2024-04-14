package net.tamasnovak.entities.account.accountByRole;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.base.id.BaseSimpleIdEntity;
import net.tamasnovak.entities.institution.Institution;

@Entity
@Table(name = "institution_admins")
public class InstitutionAdmin extends BaseSimpleIdEntity {
  @OneToOne
  @JoinColumn(name = "institution_id", referencedColumnName = "id")
  @JsonManagedReference
  private Institution institution;

  protected InstitutionAdmin() {}
}
