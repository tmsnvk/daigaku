package net.tamasnovak.artifact.application.studentapplication.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.validation.annotations.validuuid.ValidUUID;

import java.util.UUID;

public record NewApplicationByStudent(
  @NotBlank(message = "Select a country.")
  @ValidUUID(message = "Select a valid country.")
  UUID countryUuid,

  @NotBlank(message = "Select a university.")
  @ValidUUID(message = "Select a valid university.")
  UUID universityUuid,

  @NotBlank(message = "Provide the name of your course. Use only letters and spaces.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}-\\s]{5,255}$", message = "Use only letters and spaces. Provide a minimum of 5 and a maximum of 255 characters.")
  String courseName,

  @Pattern(regexp = "^(?:[\\p{IsAlphabetic}-\\s]{5,255}|)$", message = "Use only letters and spaces. Provide a minimum of 5 and a maximum of 255 characters.")
  String minorSubject,

  @NotNull(message = "Provide the length of your course (in years).")
  @Min(value = 2, message = "Programme length should not be less than {value}.")
  @Max(value = 5, message = "Programme length should not be more than {value}.")
  int programmeLength
) {}
