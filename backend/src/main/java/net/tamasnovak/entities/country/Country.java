package net.tamasnovak.entities.country;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.entities.address.Address;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.base.audit.Auditable;
import net.tamasnovak.entities.university.University;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "countries")
public final class Country extends Auditable {
  @Column(name = "name", nullable = false)
  @NotBlank(message = "Provide the country's name.")
  @Pattern(regexp = "^[A-Za-z-\\s]{2,100}$", message = "Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.")
  private String name;

  @OneToMany(mappedBy = "country")
  @JsonManagedReference(value = "country_address_reference")
  private List<Address> addresses;

  @OneToMany(mappedBy = "country", fetch = FetchType.EAGER)
  @JsonManagedReference(value = "country_university_reference")
  private List<University> universities;

  @OneToMany(mappedBy = "country")
  @JsonManagedReference(value = "country_application_reference")
  private List<Application> applications;

  protected Country() {}

  private Country(String name) {
    this.name = name;
    this.addresses = new ArrayList<>();
    this.universities = new ArrayList<>();
    this.applications = new ArrayList<>();
  }

  public static Country createCountry(String name) {
    return new Country(name);
  }

  public String getName() {
    return name;
  }

  public void verifyUniversityCountryLink(University university, String exceptionMessage) {
    if (!universities.contains(university)) {
      throw new EntityNotFoundException(exceptionMessage);
    }
  }
}
