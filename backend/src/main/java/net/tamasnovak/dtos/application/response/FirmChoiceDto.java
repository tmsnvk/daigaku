package net.tamasnovak.dtos.application.response;

import java.io.Serial;
import java.io.Serializable;

public record FirmChoiceDto(
  String country,
  String university,
  String courseName
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
