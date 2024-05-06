package net.tamasnovak.dtos.university;

import java.util.UUID;

public interface UniversityOptionView {
  UUID getUuid();
  String getName();
  String getAbbreviation();
}
