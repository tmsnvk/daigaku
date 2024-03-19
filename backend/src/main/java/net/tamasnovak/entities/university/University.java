package net.tamasnovak.entities.university;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import net.tamasnovak.entities.BaseEntity;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.country.Country;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "universities")
public final class University extends BaseEntity {
  @Column(name = "name", nullable = false)
  @NotBlank
  private String name;

  @Column(name = "abbreviation", nullable = false)
  @NotBlank
  private String abbreviation;

  @Column(name = "country", nullable = false)
  @NotBlank
  private String country;

  @Column(name = "address", nullable = false)
  private String address;

  @ManyToOne
  @JoinColumn(name = "country_id", nullable = false)
  @JsonBackReference
  private Country countryId;

  @OneToMany(mappedBy = "universityId")
  @JsonManagedReference
  private Set<Application> applications;

  public University() {}

  public University(String name, String abbreviation, String country, String address) {
    this.name = name;
    this.abbreviation = abbreviation;
    this.country = country;
    this.address = address;
    this.applications = new HashSet<>();
  }

  public String getName() {
    return name;
  }

  public String getAbbreviation() {
    return abbreviation;
  }

  public String getCountry() {
    return country;
  }

  public String getAddress() {
    return address;
  }

  public Country getCountryId() {
    return countryId;
  }

  public Set<Application> getApplications() {
    return applications;
  }
}
