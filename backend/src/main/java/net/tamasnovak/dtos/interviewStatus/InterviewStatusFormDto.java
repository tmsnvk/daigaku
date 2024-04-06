package net.tamasnovak.dtos.interviewStatus;

import java.util.UUID;

public record InterviewStatusFormDto(
  UUID uuid,
  String name
) {}
