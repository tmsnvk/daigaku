package net.tamasnovak.domains.account.shared.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.domains.role.models.entity.Role;
import net.tamasnovak.domains.shared.models.entities.audit.Auditable;
import net.tamasnovak.domains.support.institution.models.entity.Institution;

import java.util.Arrays;
import java.util.stream.Collectors;

@MappedSuperclass
public abstract class BaseAccount extends Auditable {
  @Column(name = "first_name", nullable = false)
  @NotBlank(message = "Provide a first name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}-\\s]{2,100}$", message = "Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.")
  protected String firstName;

  @Column(name = "last_name", nullable = false)
  @NotBlank(message = "Provide a first name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}-\\s]{2,100}$", message = "Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.")
  protected String lastName;

  @Column(name = "email", unique = true, nullable = false)
  @Email(message = "Provide a valid email address.")
  protected String email;

  @ManyToOne
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference(value = "institution-account_reference")
  protected Institution institution;

  @ManyToOne
  @JoinColumn(name = "role_id")
  @JsonBackReference(value = "role-account_reference")
  protected Role role;

  protected BaseAccount() {}

  protected BaseAccount(String firstName, String lastName, String email, Institution institution, Role role) {
    this.firstName = capitaliseName(firstName);
    this.lastName = capitaliseName(lastName);
    this.email = lowerCaseEmail(email);
    this.institution = institution;
    this.role = role;
  }

  private static String capitaliseName(String word) {
    return Arrays.stream(word.trim().split("\\s+"))
    .map(element -> {
      if (!element.contains("-")) {
        return capitaliseWithoutSpecialCharacters(element);
      } else {
        return capitaliseWithHyphen(element);
      }
    })
    .collect(Collectors.joining(" "));
  }

  private static String capitaliseWithoutSpecialCharacters(String word) {
    return Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase();
  }

  private static String capitaliseWithHyphen(String word) {
    return Arrays.stream(word.split("-"))
      .map(element -> Character.toUpperCase(element.charAt(0)) + element.substring(1).toLowerCase())
      .collect(Collectors.joining("-"));
  }

  private static String lowerCaseEmail(String email) {
    return email.trim().toLowerCase();
  }

  public String getFirstName() {
    return this.firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  public long getInstitutionId() {
    return this.institution.getId();
  }
}
