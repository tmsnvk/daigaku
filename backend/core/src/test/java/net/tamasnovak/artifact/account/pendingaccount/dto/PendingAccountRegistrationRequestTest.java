/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Description;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PendingAccountRegistrationRequestTest {
  private final String expectedValidEmail = "expectedvalidemail@test.net";
  private final String validUuidString = UUID.randomUUID().toString();
  Set<ConstraintViolation<PendingAccountRegistrationRequest>> violations = new HashSet<>();
  PendingAccountRegistrationRequest underTest = null;

  @AfterEach
  void tearDown() {
    violations.clear();
    underTest = null;
  }

  @Nested
  @DisplayName("PendingAccountRegistrationRequest validation no-violation unit tests")
  class WhenDtoIsValid {
    @Test
    @Description("Asserts that there are no violations when underTest contains only valid properties.")
    void shouldAssert_thatViolationsSetIsEmpty_whenRequestBodyIsValid() {
      underTest = new PendingAccountRegistrationRequest("Valid", "User", expectedValidEmail, validUuidString, validUuidString);

      violations = validate(underTest);

      assertTrue(violations.isEmpty());
    }
  }

  @Nested
  @DisplayName("PendingAccountRegistration validation violation unit tests")
  class WhenDtoIsInvalid {
    @Test
    @Description("Asserts that there is a violation when underTest's firstName fails @NotBlank validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenFirstNameFailsNotBlankValidation() {
      underTest = new PendingAccountRegistrationRequest("", "User", expectedValidEmail, validUuidString, validUuidString);

      violations = validate(underTest);
      String actualViolationPath = violations.iterator().next().getPropertyPath().toString();

      assertEquals("firstName", actualViolationPath);
    }

    @Test
    @Description("Asserts that there is a violation when underTest's firstName fails @Pattern validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenFirstNameFailsPatternValidation() {
      underTest = new PendingAccountRegistrationRequest("Inv4l-d", "User", expectedValidEmail, validUuidString, validUuidString);

      violations = validate(underTest);
      String actualViolationPath = violations.iterator().next().getPropertyPath().toString();

      assertEquals("firstName", actualViolationPath);
    }

    @Test
    @Description("Asserts that there is a violation when underTest's lastName fails @NotBlank validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenLastNameFailsNotBlankValidation() {
      underTest = new PendingAccountRegistrationRequest("Valid", "", expectedValidEmail, validUuidString, validUuidString);

      violations = validate(underTest);
      String actualViolationPath = violations.iterator().next().getPropertyPath().toString();

      assertEquals("lastName", actualViolationPath);
    }

    @Test
    @Description("Asserts that there is a violation when underTest's lastName fails @Pattern validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenLastNameFailsPatternValidation() {
      underTest = new PendingAccountRegistrationRequest("Valid", "!s3r", expectedValidEmail, validUuidString, validUuidString);

      violations = validate(underTest);
      String actualViolationPath = violations.iterator().next().getPropertyPath().toString();

      assertEquals("lastName", actualViolationPath);
    }

    @Test
    @Description("Asserts that there is a violation when underTest's email fails @Email validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenEmailFailsEmailValidation() {
      underTest = new PendingAccountRegistrationRequest("Valid", "User", "invalidemail.com", validUuidString, validUuidString);

      violations = validate(underTest);
      String actualViolationPath = violations.iterator().next().getPropertyPath().toString();

      assertEquals("email", actualViolationPath);
    }

    @Test
    @Description("Asserts that there is a violation when underTest's institutionUuid fails @NotBlank validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenInstitutionUuidFailsNotBlankValidation() {
      underTest = new PendingAccountRegistrationRequest("Valid", "User", expectedValidEmail, "", validUuidString);

      violations = validate(underTest);
      String actualViolationPath = violations.iterator().next().getPropertyPath().toString();

      assertEquals("institutionUuid", actualViolationPath);
    }

    @Test
    @Description("Asserts that there is a violation when underTest's institutionUuid fails @UuidConstraint validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenInstitutionUuidFailsUuidConstraintValidation() {
      underTest = new PendingAccountRegistrationRequest("Valid", "User", expectedValidEmail, "invalidUuid", validUuidString);

      violations = validate(underTest);
      String actualViolationPath = violations.iterator().next().getPropertyPath().toString();

      assertEquals("institutionUuid", actualViolationPath);
    }

    @Test
    @Description("Asserts that there is a violation when underTest's accountRoleUuid fails @NotBlank validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenAccountTypeFailsNotBlankValidation() {
      underTest = new PendingAccountRegistrationRequest("Valid", "User", expectedValidEmail, validUuidString, "");

      violations = validate(underTest);
      String actualViolationPath = violations.iterator().next().getPropertyPath().toString();

      assertEquals("accountRoleUuid", actualViolationPath);
    }

    @Test
    @Description("Asserts that there is a violation when underTest's accountRoleUuid fails @UuidConstraint validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenAccountTypeFailsPatternValidation() {
      underTest = new PendingAccountRegistrationRequest("Valid", "User", expectedValidEmail, validUuidString, "invalidUuid");

      violations = validate(underTest);
      String actualViolationPath = violations.iterator().next().getPropertyPath().toString();

      assertEquals("accountRoleUuid", actualViolationPath);
    }

    @Test
    @Description("Asserts that there are multiple violations when underTest's lastName fails @Pattern, email fails @Email and "
      + "accountRoleUuid fails @UuidConstraint validation.")
    void shouldAssert_thatViolationSetIsNotEmpty_whenRequestBodyFailsMultipleValidations() {
      underTest = new PendingAccountRegistrationRequest("Valid", "!s3r", "invalidemail.com", validUuidString, "invalidUuid");
      Set<String> expectedViolationPaths = Set.of("lastName", "email", "accountRoleUuid");

      violations = validate(underTest);
      Set<String> actualViolationPaths = violations.stream()
                                                   .map(violation -> violation.getPropertyPath().toString())
                                                   .collect(Collectors.toSet());

      assertEquals(expectedViolationPaths, actualViolationPaths);
    }
  }

  @Nested
  @DisplayName("Institution uuid getter unit tests")
  class InstitutionUuidGetterUnitTests {
    @Test
    @Description("Asserts that getInstituionUuid() uuid transformation is valid when the provided uuid is valid.")
    void shouldAssert_thatInstitutionUuidTransformationIsValid_withValidUuid() {
      underTest = new PendingAccountRegistrationRequest("Valid", "User", expectedValidEmail, validUuidString, validUuidString);

      UUID actualInstitutionUuid = underTest.getInstituionUuid();

      assertEquals(UUID.fromString(validUuidString), actualInstitutionUuid);
    }

    @Test
    @Description("Asserts that getInstituionUuid() uuid transformation fails when the provided uuid is invalid.")
    void shouldAssert_thatInstitutionUuidTransformationFails_withInvalidUuid() {
      underTest = new PendingAccountRegistrationRequest("Valid", "User", expectedValidEmail, "invalidUuid", validUuidString);

      assertThrows(IllegalArgumentException.class, () -> underTest.getInstituionUuid());
    }
  }

  @Nested
  @DisplayName("Role uuid getter unit tests")
  class RoleUuidGetterUnitTests {
    @Test
    @Description("Asserts that getAccountRoleUuid() uuid transformation is valid when the provided uuid is valid.")
    void shouldAssert_thatAccountRoleUuidTransformationIsValid_withValidUuid() {
      underTest = new PendingAccountRegistrationRequest("Valid", "User", expectedValidEmail, validUuidString, validUuidString);

      UUID actualAccountRoleUuid = underTest.getAccountRoleUuid();

      assertEquals(UUID.fromString(validUuidString), actualAccountRoleUuid);
    }

    @Test
    @Description("Asserts that getAccountRoleUuid() uuid transformation fails when the provided uuid is invalid.")
    void shouldAssert_thatAccountRoleUuidTransformationFails_withInvalidUuid() {
      underTest = new PendingAccountRegistrationRequest("Valid", "User", expectedValidEmail, validUuidString, "invalidUuid");

      assertThrows(IllegalArgumentException.class, () -> underTest.getAccountRoleUuid());
    }
  }

  private Set<ConstraintViolation<PendingAccountRegistrationRequest>> validate(PendingAccountRegistrationRequest underTest) {
    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    return validator.validate(underTest);
  }
}
