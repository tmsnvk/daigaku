package net.tamasnovak.exceptions;

public record FieldValidationErrorResponse(
	String fieldName,
	String errorMessage
) {}
