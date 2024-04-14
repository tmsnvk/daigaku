package net.tamasnovak.entities.country;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import net.tamasnovak.entities.BaseEntity;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.entities.application.Application;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "countries")
public final class Country extends BaseEntity {
  @Column(name = "name", nullable = false)
  @NotBlank(message = "Provide the countryUuid's name.")
  @Size(min = 2, max = 100, message = "The name should be between 2 and 100 characters long.")
  private String name;

  @OneToMany(mappedBy = "countryId")
  @JsonManagedReference
  private Set<University> universities;

  @OneToMany(mappedBy = "countryId")
  @JsonManagedReference
  private Set<Application> applications;

  public Country() {}

  public Country(String name) {
    this.name = name;
    this.universities = new HashSet<>();
    this.applications = new HashSet<>();
  }

  public String getName() {
    return name;
  }

  public Set<University> getUniversities() {
    return universities;
  }

  public Set<Application> getApplications() {
    return applications;
  }
}
