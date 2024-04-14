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
import jakarta.validation.constraints.Size;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.base.audit.Auditable;
import net.tamasnovak.entities.country.Country;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "universities")
public final class University extends Auditable {
  @Column(name = "name", nullable = false)
  @NotBlank(message = "Provide the universityUuid's official name.")
  @Size(min = 2, message = "The name should be a minimum of 2 characters long.")
  private String name;

  @Column(name = "abbreviation", nullable = false)
  @NotBlank(message = "Provide the universityUuid's official abbreviation.")
  @Size(min = 2, max = 5, message = "The abbreviation should be between 2 and 5 characters long.")
  private String abbreviation;

  @Column(name = "address", nullable = false)
  private String address;

  @ManyToOne
  @JoinColumn(name = "country_id", nullable = false)
  @JsonBackReference
  private Country country;

  @OneToMany(mappedBy = "university")
  @JsonManagedReference
  private Set<Application> applications;

  protected University() {}

  public University(String name, String abbreviation, String address) {
    this.name = name;
    this.abbreviation = abbreviation;
    this.address = address;
    this.applications = new HashSet<>();
  }

  public String getName() {
    return name;
  }

  public String getAbbreviation() {
    return abbreviation;
  }

  public String getAddress() {
    return address;
  }

  public Country getCountry() {
    return country;
  }

  public Set<Application> getApplications() {
    return applications;
  }
}
