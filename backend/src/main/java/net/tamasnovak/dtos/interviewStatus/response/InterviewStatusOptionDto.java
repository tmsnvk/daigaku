package net.tamasnovak.dtos.interviewStatus.response;

import java.util.UUID;

public record InterviewStatusOptionDto(
  UUID uuid,
  String name
) {}
