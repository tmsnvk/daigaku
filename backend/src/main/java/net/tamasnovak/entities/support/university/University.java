package net.tamasnovak.entities.support.university;

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
import net.tamasnovak.entities.address.Address;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.base.support.BaseSupportEntity;
import net.tamasnovak.entities.support.country.Country;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "universities")
public final class University extends BaseSupportEntity {
  @Column(name = "abbreviation", nullable = false)
  @NotBlank(message = "Provide the university's official abbreviation.")
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

  protected University() {}

  private University(String name, String abbreviation, Address address) {
    super(name);
    this.abbreviation = abbreviation;
    this.address = address;
    this.applications = new ArrayList<>();
  }

  public static University createUniveristy(String name, String abbreviation, Address address) {
    return new University(name, abbreviation, address);
  }

  public String getAbbreviation() {
    return abbreviation;
  }

  public Address getAddress() {
    return address;
  }

  public Country getCountry() {
    return country;
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, id, uuid);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    University that = (University) o;
    return Objects.equals(name, that.name) && Objects.equals(id, that.id) && Objects.equals(uuid, that.uuid);
  }
}