package net.tamasnovak.dtos.account.request;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Description;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PendingAccountRegistrationDtoTest {
  private final String expectedValidEmail = "notexistingemail@test.net";
  private final String validUuid = UUID.randomUUID().toString();
  Set<ConstraintViolation<PendingAccountRegistrationDto>> violations = new HashSet<>();
  PendingAccountRegistrationDto underTest = null;

  @BeforeEach
  public void setUp() {
    violations.clear();
    underTest = null;
  }

  @Nested
  @DisplayName("PendingAccountRegistrationDto validation no-violation unit tests")
  class WhenDtoIsValid {
    @Test
    @Description("Assert that there are no violations if requestBody contains only valid fields.")
    public void shouldAssert_ThatViolationsSetIsEmpty_IfRequestBodyIsValid() {
      underTest = new PendingAccountRegistrationDto(
        "Valid",
        "User",
        expectedValidEmail,
        validUuid,
        "STUDENT"
      );

      violations = validate(underTest);

      assertTrue(violations.isEmpty());
    }
  }

  @Nested
  @DisplayName("PendingAccountRegistrationDto validation violation unit tests")
  class WhenInvalid {
    @Test
    @Description("Assert that there is a violation if requestBody's firstName fails @NotBlank validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfFirstNameFailsNotBlankValidation() {
      underTest = new PendingAccountRegistrationDto(
        "",
        "User",
        expectedValidEmail,
        validUuid,
        "STUDENT"
      );

      violations = validate(underTest);

      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("firstName", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation if requestBody's firstName fails @Pattern validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfFirstNameFailsPatternValidation() {
      underTest = new PendingAccountRegistrationDto(
        "Inv4l-d",
        "User",
        expectedValidEmail,
        validUuid,
        "STUDENT"
      );

      violations = validate(underTest);

      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("firstName", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation if requestBody's lastName fails @NotBlank validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfLastNameFailsNotBlankValidation() {
      underTest = new PendingAccountRegistrationDto(
        "Valid",
        "",
        expectedValidEmail,
        validUuid,
        "STUDENT"
      );

      violations = validate(underTest);

      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("lastName", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation if requestBody's lastName fails @Pattern validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfLastNameFailsPatternValidation() {
      underTest = new PendingAccountRegistrationDto(
        "Valid",
        "!s3r",
        expectedValidEmail,
        validUuid,
        "STUDENT"
      );

      violations = validate(underTest);

      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("lastName", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation if requestBody's email fails @Email validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfEmailFailsEmailValidation() {
      underTest = new PendingAccountRegistrationDto(
        "Valid",
        "User",
        "invalidemail.com",
        validUuid,
        "STUDENT"
      );

      violations = validate(underTest);

      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("email", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation if requestBody's institutionUuid fails @NotBlank validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfInstitutionUuidFailsNotBlankValidation() {
      underTest = new PendingAccountRegistrationDto(
        "Valid",
        "User",
        expectedValidEmail,
        "",
        "STUDENT"
      );

      violations = validate(underTest);

      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("institutionUuid", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation if requestBody's institutionUuid fails @UuidConstraint validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfInstitutionUuidFailsUuidConstraintValidation() {
      underTest = new PendingAccountRegistrationDto(
        "Valid",
        "User",
        expectedValidEmail,
        "validUuid",
        "STUDENT"
      );

      violations = validate(underTest);

      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("institutionUuid", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation if requestBody's accountType fails @NotBlank validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfAccountTypeFailsNotBlankValidation() {
      underTest = new PendingAccountRegistrationDto(
        "Valid",
        "User",
        expectedValidEmail,
        validUuid,
        ""
      );

      violations = validate(underTest);

      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("accountType", actualViolationType);
    }

    @Test
    @Description("Assert that there is a violation if requestBody's accountType fails @Pattern validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfAccountTypeFailsPatternValidation() {
      underTest = new PendingAccountRegistrationDto(
        "Valid",
        "User",
        expectedValidEmail,
        validUuid,
        "INVALID_TYPE"
      );

      violations = validate(underTest);

      String actualViolationType = violations.iterator().next().getPropertyPath().toString();

      assertEquals("accountType", actualViolationType);
    }
  }

  private Set<ConstraintViolation<PendingAccountRegistrationDto>> validate(PendingAccountRegistrationDto underTest) {
    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    return validator.validate(underTest);
  }
}
