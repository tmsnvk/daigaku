package net.tamasnovak.utilities.validator;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public final class ValidatorUtilities {
  private ValidatorUtilities() {}

  public void verifyUuidMatch(UUID uuid, UUID uuidToCheckAgainst, String exceptionMessage) {
    if (!uuid.equals(uuidToCheckAgainst)) {
      throw new IllegalArgumentException(exceptionMessage);
    }
  }
}
