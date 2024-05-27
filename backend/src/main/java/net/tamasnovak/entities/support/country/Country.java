package net.tamasnovak.entities.support.country;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.address.Address;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.base.support.BaseSupportEntity;
import net.tamasnovak.entities.support.university.University;

import java.util.ArrayList;
import java.util.List;

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
}
