package net.tamasnovak.domains.support.country.models.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.domains.address.models.entity.Address;
import net.tamasnovak.domains.application.shared.models.entity.Application;
import net.tamasnovak.domains.support.shared.models.entity.BaseSupportEntity;
import net.tamasnovak.domains.support.university.models.entity.University;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "countries")
public final class Country extends BaseSupportEntity {
  @OneToMany(mappedBy = "country")
  @JsonManagedReference(value = "country-address_reference")
  private List<Address> addresses;

  @OneToMany(mappedBy = "country", fetch = FetchType.EAGER)
  @JsonManagedReference(value = "country-university_reference")
  private List<University> universities;

  @OneToMany(mappedBy = "country")
  @JsonManagedReference(value = "country-application_reference")
  private List<Application> applications;

  protected Country() {}

  private Country(String name) {
    super(name);
    this.addresses = new ArrayList<>();
    this.universities = new ArrayList<>();
    this.applications = new ArrayList<>();
  }

  public static Country createCountry(String name) {
    return new Country(name);
  }

  public void verifyUniversityCountryLink(University university, String exceptionMessage) {
    if (!universities.contains(university)) {
      throw new EntityNotFoundException(exceptionMessage);
    }
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, id, uuid);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    Country that = (Country) o;
    return Objects.equals(name, that.name) && Objects.equals(id, that.id) && Objects.equals(uuid, that.uuid);
  }
}
