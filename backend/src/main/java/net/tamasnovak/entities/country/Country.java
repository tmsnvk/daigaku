package net.tamasnovak.entities.country;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import net.tamasnovak.entities.address.Address;
import net.tamasnovak.entities.base.audit.Auditable;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.entities.application.Application;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "countries")
public final class Country extends Auditable {
  @Column(name = "name", nullable = false)
  @NotBlank(message = "Provide the country's name.")
  @Size(min = 2, max = 100, message = "The name should be between 2 and 100 characters long.")
  private String name;

  @OneToMany(mappedBy = "country")
  private Set<Address> addresses;

  @OneToMany(mappedBy = "country")
  @JsonManagedReference
  private Set<University> universities;

  @OneToMany(mappedBy = "country")
  @JsonManagedReference
  private Set<Application> applications;

  protected Country() {}

  public Country(String name) {
    this.name = name;
    this.universities = new HashSet<>();
    this.applications = new HashSet<>();
  }

  public String getName() {
    return name;
  }

  public Set<Address> getAddresses() {
    return addresses;
  }

  public Set<Application> getApplications() {
    return applications;
  }

  public void checkIfUniversityBelongsToCountry(University university, String entityNotFoundErrorMessage) {
    if (!universities.contains(university)) {
      throw new EntityNotFoundException(entityNotFoundErrorMessage);
    }
  }
}
