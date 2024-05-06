package net.tamasnovak.utilities;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public final class ValidatorUtilities {
  private ValidatorUtilities() {}

  public void checkIfUuidsAreEqual(UUID uuid, UUID uuidToCheckAgainst, String exceptionMessage) {
    if (!uuid.equals(uuidToCheckAgainst)) {
      throw new IllegalArgumentException(exceptionMessage);
    }
  }
}
