package net.tamasnovak.dtos.account.request;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Description;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

class PendingAccountRegistrationDtoTest {
  private final String expectedValidEmail = "notexistingemail@test.net";
  Set<ConstraintViolation<PendingAccountRegistrationDto>> violations = new HashSet<>();
  PendingAccountRegistrationDto requestBody = null;

  @BeforeEach
  public void setUp() {
    violations.clear();
    requestBody = null;
  }

  @Nested
  @DisplayName("PendingAccountRegistrationDto validation no-violation unit tests")
  class WhenValid {
    @Test
    @Description("Assert that there are no violations if requestBody contains only valid fields.")
    public void shouldAssert_ThatViolationsSetIsEmpty_IfRequestBodyIsValid() {
      requestBody = new PendingAccountRegistrationDto(
        "Valid",
        "User",
        expectedValidEmail,
        UUID.randomUUID().toString(),
        "STUDENT"
      );

      violations = validate(requestBody);

      Assertions.assertTrue(violations.isEmpty());
    }
  }

  @Nested
  @DisplayName("PendingAccountRegistrationDto validation violation unit tests")
  class WhenInvalid {
    @Test
    @Description("Assert that there is a violation if requestBody's firstName fails @NotBlank validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfFirstNameFailsNotBlankValidation() {
      requestBody = new PendingAccountRegistrationDto(
        "",
        "User",
        expectedValidEmail,
        UUID.randomUUID().toString(),
        "STUDENT"
      );

      violations = validate(requestBody);

      Assertions.assertFalse(violations.isEmpty());
    }

    @Test
    @Description("Assert that there is a violation if requestBody's firstName fails @Pattern validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfFirstNameFailsPatternValidation() {
      requestBody = new PendingAccountRegistrationDto(
        "Inv4l-d",
        "User",
        expectedValidEmail,
        UUID.randomUUID().toString(),
        "STUDENT"
      );

      violations = validate(requestBody);
      System.out.println(violations);
      Assertions.assertFalse(violations.isEmpty());
    }

    @Test
    @Description("Assert that there is a violation if requestBody's lastName fails @NotBlank validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfLastNameFailsNotBlankValidation() {
      requestBody = new PendingAccountRegistrationDto(
        "Valid",
        "",
        expectedValidEmail,
        UUID.randomUUID().toString(),
        "STUDENT"
      );

      violations = validate(requestBody);

      Assertions.assertFalse(violations.isEmpty());
    }

    @Test
    @Description("Assert that there is a violation if requestBody's lastName fails @Pattern validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfLastNameFailsPatternValidation() {
      requestBody = new PendingAccountRegistrationDto(
        "Valid",
        "!s3r",
        expectedValidEmail,
        UUID.randomUUID().toString(),
        "STUDENT"
      );

      violations = validate(requestBody);

      Assertions.assertFalse(violations.isEmpty());
    }

    @Test
    @Description("Assert that there is a violation if requestBody's email fails @Email validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfEmailFailsEmailValidation() {
      requestBody = new PendingAccountRegistrationDto(
        "Valid",
        "User",
        "invalidemail.com",
        UUID.randomUUID().toString(),
        "STUDENT"
      );

      violations = validate(requestBody);

      Assertions.assertFalse(violations.isEmpty());
    }

    @Test
    @Description("Assert that there is a violation if requestBody's institutionUuid fails @UuidConstraint validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfInstitutionUuidFailsUuidConstraintValidation() {
      requestBody = new PendingAccountRegistrationDto(
        "Valid",
        "User",
        expectedValidEmail,
        "UUID.randomUUID().toString()",
        "STUDENT"
      );

      violations = validate(requestBody);

      Assertions.assertFalse(violations.isEmpty());
    }

    @Test
    @Description("Assert that there is a violation if requestBody's accountType fails @Pattern validation.")
    public void shouldAssert_ThatViolationsSetIsNotEmpty_IfAccountTypeFailsPatternValidation() {
      requestBody = new PendingAccountRegistrationDto(
        "Valid",
        "User",
        expectedValidEmail,
        UUID.randomUUID().toString(),
        "INVALID_TYPE"
      );

      violations = validate(requestBody);

      Assertions.assertFalse(violations.isEmpty());
    }
  }

  private Set<ConstraintViolation<PendingAccountRegistrationDto>> validate(PendingAccountRegistrationDto underTest) {
    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    return validator.validate(underTest);
  }
}
