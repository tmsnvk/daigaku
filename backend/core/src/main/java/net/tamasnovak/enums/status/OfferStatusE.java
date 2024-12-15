/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.enums.status;

public enum OfferStatusE {
  CONDITIONAL("Conditional"),
  DEFERRED("Deferred"),
  REJECTED("Rejected"),
  UNCONDITIONAL("Unconditional");

  private final String name;

  OfferStatusE(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
