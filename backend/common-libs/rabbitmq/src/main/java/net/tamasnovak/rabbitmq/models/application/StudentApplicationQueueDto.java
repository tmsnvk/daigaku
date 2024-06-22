package net.tamasnovak.rabbitmq.models.application;

import java.sql.Timestamp;

public record StudentApplicationQueueDto(
	Timestamp createdAt,
	Timestamp lastUpdatedAt,
	String courseName,
	String university,
	String country,
	String applicationStatus,
	String interviewStatus,
	String offerStatus,
	String responseStatus,
	String finalDestinationStatus
) {}
