package net.tamasnovak.projections.university;

import java.util.UUID;

public interface UniversityOptionView {
  UUID getUuid();
  String getName();
  String getAbbreviation();
}
