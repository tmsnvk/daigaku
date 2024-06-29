package net.tamasnovak.s3module.services.amazonS3Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;

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
  public void uploadFileToS3Bucket(String filename, File file) {
    PutObjectRequest putObjectRequest = PutObjectRequest.builder()
      .bucket(bucket)
      .key(filename)
      .build();

    s3Client.putObject(putObjectRequest, RequestBody.fromFile(file));
  }
}
