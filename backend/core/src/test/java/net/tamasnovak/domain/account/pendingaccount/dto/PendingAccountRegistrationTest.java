package net.tamasnovak.domain.account.pendingaccount.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Description;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PendingAccountRegistrationTest {
  private final String expectedValidEmail = "notexistingemail@test.net";
  private final String validUuidString = UUID.randomUUID().toString();
  Set<ConstraintViolation<PendingAccountRegistration>> violations = new HashSet<>();
  PendingAccountRegistration underTest = null;

  @AfterEach
  void tearDown() {
    violations.clear();
    underTest = null;
  }

  @Nested
  @DisplayName("PendingAccountRegistration validation no-violation unit tests")
  class WhenDtoIsValid {
    @Test
    @Description("Assert that there are no violations when underTest requestBody contains only valid fields.")
    void shouldAssert_thatViolationsSetIsEmpty_whenRequestBodyIsValid() {
      underTest = new PendingAccountRegistration(
        "Valid",
        "User",
        expectedValidEmail,
        validUuidString,
        validUuidString
      );

      violations = validate(underTest);

      assertTrue(violations.isEmpty());
    }
  }

  @Nested
  @DisplayName("PendingAccountRegistration validation violation unit tests")
  class WhenDtoIsInvalid {
    @Test
    @Description("Assert that there is a violation when underTest requestBody's firstName fails @NotBlank validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenFirstNameFailsNotBlankValidation() {
      underTest = new PendingAccountRegistration(
        "",
        "User",
        expectedValidEmail,
        validUuidString,
        validUuidString
      );

      violations = validate(underTest);
      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("firstName", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation when underTest requestBody's firstName fails @Pattern validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenFirstNameFailsPatternValidation() {
      underTest = new PendingAccountRegistration(
        "Inv4l-d",
        "User",
        expectedValidEmail,
        validUuidString,
        validUuidString
      );

      violations = validate(underTest);
      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("firstName", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation when underTest requestBody's lastName fails @NotBlank validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenLastNameFailsNotBlankValidation() {
      underTest = new PendingAccountRegistration(
        "Valid",
        "",
        expectedValidEmail,
        validUuidString,
        validUuidString
      );

      violations = validate(underTest);
      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("lastName", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation when underTest requestBody's lastName fails @Pattern validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenLastNameFailsPatternValidation() {
      underTest = new PendingAccountRegistration(
        "Valid",
        "!s3r",
        expectedValidEmail,
        validUuidString,
        validUuidString
      );

      violations = validate(underTest);
      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("lastName", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation when underTest requestBody's email fails @Email validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenEmailFailsEmailValidation() {
      underTest = new PendingAccountRegistration(
        "Valid",
        "User",
        "invalidemail.com",
        validUuidString,
        validUuidString
      );

      violations = validate(underTest);
      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("email", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation when underTest requestBody's institutionUuid fails @NotBlank validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenInstitutionUuidFailsNotBlankValidation() {
      underTest = new PendingAccountRegistration(
        "Valid",
        "User",
        expectedValidEmail,
        "",
        validUuidString
      );

      violations = validate(underTest);
      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("institutionUuid", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation when underTest requestBody's institutionUuid fails @UuidConstraint validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenInstitutionUuidFailsUuidConstraintValidation() {
      underTest = new PendingAccountRegistration(
        "Valid",
        "User",
        expectedValidEmail,
        "validUuid",
        validUuidString
      );

      violations = validate(underTest);
      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("institutionUuid", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation when underTest requestBody's accountRoleUuid fails @NotBlank validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenAccountTypeFailsNotBlankValidation() {
      underTest = new PendingAccountRegistration(
        "Valid",
        "User",
        expectedValidEmail,
        validUuidString,
        ""
      );

      violations = validate(underTest);
      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("accountRoleUuid", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation when underTest requestBody's accountRoleUuid fails @UuidConstraint validation.")
    void shouldAssert_thatViolationsSetIsNotEmpty_whenAccountTypeFailsPatternValidation() {
      underTest = new PendingAccountRegistration(
        "Valid",
        "User",
        expectedValidEmail,
        validUuidString,
        "validUuid"
      );

      violations = validate(underTest);
      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("accountRoleUuid", actualViolationType);
    }
  }

  private Set<ConstraintViolation<PendingAccountRegistration>> validate(PendingAccountRegistration underTest) {
    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    return validator.validate(underTest);
  }
}
