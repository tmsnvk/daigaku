package net.tamasnovak.s3module.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import software.amazon.awssdk.services.s3.model.S3Exception;

@ControllerAdvice
public class ModuleControllerAdvice {
	@ExceptionHandler(value = { S3Exception.class })
	public ResponseEntity<String> onS3Exception(S3Exception exception) {
		String response = exception.awsErrorDetails().errorMessage();

		return ResponseEntity
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(response);
	}
}
