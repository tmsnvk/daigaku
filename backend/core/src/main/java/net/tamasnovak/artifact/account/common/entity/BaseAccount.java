/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.common.entity;

import java.util.Arrays;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import net.tamasnovak.artifact.common.entity.audit.Auditable;
import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.support.institution.entity.Institution;

/**
 * Abstract entity class that represents an ancestor class for account-related entities.
 *
 * @since 0.0.1
 */
@MappedSuperclass
public abstract class BaseAccount extends Auditable {
  @Column(name = "first_name", nullable = false)
  @NotBlank(message = "Provide a first name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{2,100}$", message =
    "Use only letters and spaces. Provide a minimum of 2 and a maximum of " + "100 characters.")
  protected String firstName;

  @Column(name = "last_name", nullable = false)
  @NotBlank(message = "Provide a last name. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{2,100}$", message =
    "Use only letters and spaces. Provide a minimum of 2 and a maximum of " + "100 characters.")
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

  protected BaseAccount() {
  }

  protected BaseAccount(String firstName, String lastName, String email, Institution institution, Role role) {
    this.firstName = capitaliseName(firstName);
    this.lastName = capitaliseName(lastName);
    this.email = normaliseEmail(email);
    this.institution = institution;
    this.role = role;
  }

  public String getFirstName() {
    return this.firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  public String getEmail() {
    return this.email;
  }

  public Institution getInstitution() {
    return institution;
  }

  public Role getRole() {
    return role;
  }

  /**
   * Fetches the id of the {@link Institution} associated with the authenticated {@link Account} or {@link PendingAccount}.
   *
   * @return Institution id.
   */
  public long fetchInstitutionId() {
    return this.getInstitution().getId();
  }

  /**
   * Fetches the name of the {@link Role} associated with the authenticated {@link Account}.
   *
   * @return Role name.
   */
  public String fetchRoleName() {
    return this.getRole().getName();
  }

  /**
   * Capitalises each word in a name.
   * Words separated by spaces and hyphens are capitalised individually.
   *
   * @param name The name to be capitalised.
   * @return The capitalised name.
   */
  private static String capitaliseName(String name) {
    return Arrays.stream(name.trim().split("\\s+"))
                 .map(BaseAccount::capitaliseWord)
                 .collect(Collectors.joining(" "));
  }

  /**
   * Capitalises a word, including each part of a hyphenated word.
   *
   * @param word The word to be capitalised.
   * @return The capitalised word.
   */
  private static String capitaliseWord(String word) {
    return Arrays.stream(word.split("-"))
                 .map(BaseAccount::capitaliseFirstLetter)
                 .collect(Collectors.joining("-"));
  }

  /**
   * Capitalises the first letter of a word and converts the rest to lowercase.
   *
   * @param part The word part to be capitalised.
   * @return The capitalised word part.
   */
  private static String capitaliseFirstLetter(String part) {
    return Character.toUpperCase(part.charAt(0)) + part.substring(1).toLowerCase();
  }

  /**
   * Normalises the user's entered email.
   *
   * @param email The user's email.
   * @return The normalised email.
   */
  private static String normaliseEmail(String email) {
    return email.toLowerCase();
  }
}
