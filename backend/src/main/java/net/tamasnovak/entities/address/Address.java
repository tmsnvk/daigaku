package net.tamasnovak.entities.address;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import net.tamasnovak.entities.base.id.BaseSimpleIdEntity;
import net.tamasnovak.entities.country.Country;

@Entity
@Table(name = "addresses")
public final class Address extends BaseSimpleIdEntity {
  @Column(name = "street", nullable = false)
  private String street;

  @Column(name = "city", nullable = false)
  private String city;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "country_id", nullable = false)
  @JsonBackReference
  private Country country;

  @Column(name = "zipcode")
  private String zipcode;

  protected Address() {}

  private Address(String street, String city, Country country, String zipcode) {
    this.street = street;
    this.city = city;
    this.country = country;
    this.zipcode = zipcode;
  }

  public static Address createAddress(String street, String city, Country country, String zipcode) {
    return new Address(street, city, country, zipcode);
  }

  public String getStreet() {
    return street;
  }

  public String getCity() {
    return city;
  }

  public Country getCountry() {
    return country;
  }

  public String getZipcode() {
    return zipcode;
  }
}
