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
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.country.Country;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "universities")
@Getter
@NoArgsConstructor
public final class University {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private int id;

  @Column(name = "uuid")
  @org.hibernate.validator.constraints.UUID
  private java.util.UUID uuid;

  @Column(name = "created_at", updatable = false)
  @PastOrPresent
  private Timestamp createdAt;

  @Column(name = "last_updated_at")
  @PastOrPresent
  private Timestamp lastUpdatedAt;

  @Column(name = "name")
  @NotBlank
  private String name;

  @Column(name = "abbreviation")
  @NotBlank
  private String abbreviation;

  @Column(name = "country")
  @NotBlank
  private String country;

  @Column(name = "address")
  private String address;

  @ManyToOne
  @JoinColumn(name = "country_id", nullable = false)
  @JsonBackReference
  private Country countryId;

  @OneToMany(mappedBy = "universityId")
  @JsonManagedReference
  private List<Application> applications;

  public University(String name, String abbreviation, String country, String address) {
    this.name = name;
    this.abbreviation = abbreviation;
    this.country = country;
    this.address = address;
    this.applications = new ArrayList<>();
  }
}
