/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.country.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.address.entity.Address;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.support.common.entity.BaseSupportEntity;
import net.tamasnovak.artifact.support.university.entity.University;

/**
 * Entity class that represents the countries database table.
 *
 * @since 0.0.1
 */
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

  protected Country() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private Country(String name) {
    super(name);
    this.addresses = new ArrayList<>();
    this.universities = new ArrayList<>();
    this.applications = new ArrayList<>();
  }

  /**
   * The default country instance creator method.
   *
   * @param name The name of the country.
   * @return {@link Country}.
   */
  public static Country createCountry(final String name) {
    return new Country(name);
  }

  /**
   * Validates whether a selected {@link University} is associated with the provided {@link Country}.
   *
   * @param university The selected university object.
   * @param exceptionMessage The exception message to throw in case of an error.
   * @throws EntityNotFoundException If the University and Country do not match.
   */
  public void validateUniversityCountryMatch(final University university, final String exceptionMessage) {
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
    if (this == o) {
      return true;
    }

    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    Country that = (Country) o;
    return Objects.equals(name, that.name) && Objects.equals(id, that.id) && Objects.equals(uuid, that.uuid);
  }
}
