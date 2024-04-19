package net.tamasnovak.utilities;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public final class ValidatorUtilities {
  public UUID validateIfStringIsUuid(String uuid) {
    try {
      return UUID.fromString(uuid);
    } catch (IllegalArgumentException exception) {
      throw new IllegalArgumentException("The request contained invalid data. Resubmit the form.");
    }
  }

  public void checkIfUuidsAreEqual(UUID uuid, UUID uuidToCheckAgainst, String exceptionMessage) {
    if (!uuid.equals(uuidToCheckAgainst)) {
      throw new IllegalArgumentException(exceptionMessage);
    }
  }

  public void checkIfApplicationMentorIsValid(long applicationMentorId, long authMentorId, String exceptionMessage) {
    if (applicationMentorId != authMentorId) {
      throw new IllegalArgumentException(exceptionMessage);
    }
  }
}
