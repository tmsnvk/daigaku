package net.tamasnovak.rabbitmq.models.studentPdfSave;

import java.sql.Timestamp;

public record StudentApplicationDto(
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
