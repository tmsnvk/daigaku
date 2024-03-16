package net.tamasnovak.entities.university;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.country.Country;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "universities")
public final class University {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private long id;

  @Column(name = "uuid", updatable = false, nullable = false)
  @org.hibernate.validator.constraints.UUID
  private java.util.UUID uuid;

  @Column(name = "created_at", updatable = false, nullable = false)
  @PastOrPresent
  private Timestamp createdAt;

  @Column(name = "last_updated_at", nullable = false)
  @PastOrPresent
  private Timestamp lastUpdatedAt;

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

  public long getId() {
    return id;
  }

  public UUID getUuid() {
    return uuid;
  }

  public Timestamp getCreatedAt() {
    return createdAt;
  }

  public Timestamp getLastUpdatedAt() {
    return lastUpdatedAt;
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
