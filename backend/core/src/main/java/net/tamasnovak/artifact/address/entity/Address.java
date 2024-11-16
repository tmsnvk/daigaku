/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.address.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import net.tamasnovak.artifact.common.entity.id.BaseSimpleIdEntity;
import net.tamasnovak.artifact.support.country.entity.Country;

/**
 * Entity class that represents the addresses database table.
 *
 * @since 0.0.1
 */
@Entity
@Table(name = "addresses")
public final class Address extends BaseSimpleIdEntity {
  @Column(name = "street", nullable = false)
  private String street;

  @Column(name = "city", nullable = false)
  private String city;

  @ManyToOne
  @JoinColumn(name = "country_id", nullable = false)
  @JsonBackReference(value = "country-address_reference")
  private Country country;

  @Column(name = "zipcode")
  private String zipcode;

  protected Address() {
    // Not public as it should not be initialised blank.
    // Cannot be private or package-private as it is an @Entity class.
  }

  private Address(String street, String city, Country country, String zipcode) {
    this.street = street;
    this.city = city;
    this.country = country;
    this.zipcode = zipcode;
  }

  /**
   * The default address instance creator method.
   *
   * @param street The address's street.
   * @param city The address's city.
   * @param country The address's country.
   * @param zipcode The address's zipcode.
   * @return {@link Address}.
   */
  public static Address createAddress(final String street, final String city, final Country country, final String zipcode) {
    return new Address(street, city, country, zipcode);
  }
}
