package net.tamasnovak.services.amazonS3Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.IOException;

@Service
public class AmazonS3ServiceImpl {
  private final S3Client s3Client;

  @Value("${aws.bucket}")
  private String bucket;

  @Autowired
  public AmazonS3ServiceImpl(S3Client s3Client) {
    this.s3Client = s3Client;
  }

  public void uploadFileToS3Bucket(String filename, File file) throws IOException {
    PutObjectRequest putObjectRequest = PutObjectRequest.builder()
      .bucket(bucket)
      .key(filename)
      .build();

    s3Client.putObject(putObjectRequest, RequestBody.fromFile(file));
  }
}
