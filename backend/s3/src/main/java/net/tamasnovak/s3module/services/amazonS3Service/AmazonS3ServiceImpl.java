/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.s3module.services.amazonS3Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.File;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class AmazonS3ServiceImpl implements AmazonS3Service {
  @Value("${aws.bucket}")
  private String bucket;

  private final S3Client s3Client;

  @Autowired
  public AmazonS3ServiceImpl(S3Client s3Client) {
    this.s3Client = s3Client;
  }

  @Override
  @Transactional
  public void uploadFileToS3Bucket(final String filename, final File file) {
    final PutObjectRequest putObjectRequest = PutObjectRequest.builder()
      .bucket(bucket)
      .key(filename)
      .build();

    s3Client.putObject(putObjectRequest, RequestBody.fromFile(file));
    s3Client.close();
  }

  @Override
  @Transactional
  @Scheduled(cron = "0 0 */1 * * *")
  public void removeOldPdfFiles() {
    final ListObjectsRequest listObjects = ListObjectsRequest
      .builder()
      .bucket(bucket)
      .build();

    final ListObjectsResponse response = s3Client.listObjects(listObjects);
    final List<S3Object> objects = response.contents();

    for (S3Object pdfFile : objects) {
      Instant lastModifiedDate = Instant.parse(String.valueOf(pdfFile.lastModified()));
      Instant now = Instant.now();
      Instant seventyTwoHoursAgo = now.minus(72, ChronoUnit.HOURS);

      if (lastModifiedDate.isBefore(seventyTwoHoursAgo)) {
        deleteObject(pdfFile.key());
      }
    }

    s3Client.close();
  }

  private void deleteObject(final String objectKey) {
    final DeleteObjectRequest request = DeleteObjectRequest.builder()
      .bucket(bucket)
      .key(objectKey)
      .build();

    s3Client.deleteObject(request);
  }
}
