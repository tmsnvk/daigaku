/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.university.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import net.tamasnovak.artifact.address.entity.Address;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.support.common.entity.BaseSupportEntity;
import net.tamasnovak.artifact.support.country.entity.Country;

/**
 * Entity class that represents the universities database table.
 */
@Entity
@Table(name = "universities")
public final class University extends BaseSupportEntity {
  @Column(name = "abbreviation", nullable = false)
  @NotBlank(message = "Provide the university's international abbreviation.")
  @Size(min = 2, max = 5, message = "The abbreviation code should be between 2 and 5 characters long.")
  @Pattern(regexp = "^[A-Za-z]{2,5}$", message = "Use only letters. The code should be between 2 and 5 characters long.")
  private String abbreviation;

  @OneToOne
  @JoinColumn(name = "address_id", referencedColumnName = "id")
  private Address address;

  @ManyToOne
  @JoinColumn(name = "country_id", nullable = false)
  @JsonBackReference(value = "country-university_reference")
  private Country country;

  @OneToMany(mappedBy = "university")
  @JsonManagedReference(value = "university-application_reference")
  private List<Application> applications;

  protected University() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private University(String name, String abbreviation, Address address, Country country) {
    super(name);
    this.abbreviation = abbreviation;
    this.address = address;
    this.applications = new ArrayList<>();
    this.country = country;
  }

  /**
   * The default university instance creator method.
   *
   * @param name The university's name.
   * @param abbreviation The university's abbreviation.
   * @param address The university's address.
   * @param country The university's country.
   * @return {@link University}.
   */
  public static University createUniversity(final String name, final String abbreviation, final Address address, final Country country) {
    return new University(name, abbreviation, address, country);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, id, uuid);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }

    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    University that = (University) o;
    return Objects.equals(name, that.name) && Objects.equals(id, that.id) && Objects.equals(uuid, that.uuid);
  }
}
